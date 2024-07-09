import BudgetHuntedMapper from "@shared/database/mappers/BudgetHuntedMapper";
import { BudgetHuntedDTO } from "src/modules/hunters/dtos/BudgetHuntedDTO";
import { StatusProgressDTO } from "src/modules/hunters/dtos/StatusProgressDTO";
import { IHuntersRepository } from "src/modules/hunters/repositories/interfaces/IHuntersRepository";
import { BudgetEntity } from "../entities/BudgetEntity";
import { IBudgetItemsRepository } from "../repositories/interfaces/IBudgetItemsRepository";
import { IBudgetLooseItemsRepository } from "../repositories/interfaces/IBudgetLooseItemsRepository";
import { IBudgetsRepository } from "../repositories/interfaces/IBudgetsRepository";
import { ICustomersRepository } from "../repositories/interfaces/ICustomersRepository";
import { AppError } from "@shared/errors/AppError";
import { HunterEntity } from "src/modules/hunters/entities/HunterEntity";
import { BudgetDTO } from "../dtos/BudgetDTO";
type VerifyHunterStatusResponse = {
  hunter: HunterEntity;
  hunterIsReady: boolean;
  message: string;
};

interface ICreateBudgetServiceParams {
  budgetsRepository: IBudgetsRepository;
  huntersRepository: IHuntersRepository;
  customersRepository: ICustomersRepository;
  budgetItemsRepository: IBudgetItemsRepository;
  budgetLooseItemsRepository: IBudgetLooseItemsRepository;
}

export default class CreateBudgetService {
  private budgetsRepository: IBudgetsRepository;
  private budgetItemsRepository: IBudgetItemsRepository;
  private budgetLooseItemsRepository: IBudgetLooseItemsRepository;
  private huntersRepository: IHuntersRepository;
  private customersRepository: ICustomersRepository;
  private hunterId: string;

  constructor({
    budgetsRepository,
    huntersRepository,
    customersRepository,
    budgetItemsRepository,
    budgetLooseItemsRepository,
  }: ICreateBudgetServiceParams) {
    this.budgetsRepository = budgetsRepository;
    this.huntersRepository = huntersRepository;
    this.customersRepository = customersRepository;
    this.budgetItemsRepository = budgetItemsRepository;
    this.budgetLooseItemsRepository = budgetLooseItemsRepository;
    this.hunterId = "";
  }
  async execute(hunterId: string): Promise<BudgetEntity[]> {
    this.hunterId = hunterId;

    const hunter = await this.huntersRepository.findById(hunterId);

    const budgetsExists = await this.budgetsRepository.findAll();
    const budgetsHunted = hunter?.budgetsHunted as BudgetHuntedDTO[];
    const budgetsNormalized = budgetsHunted.map((budget) => {
      return BudgetHuntedMapper.toDomain(budget);
    });
    const budgetNotExists =
      budgetsExists.length === 0
        ? budgetsNormalized
        : budgetsNormalized.filter((budgetHunted) => {
            return !budgetsExists.some((budgetExists) => {
              return (
                budgetExists.shortId === Number(budgetHunted.shortId) &&
                budgetExists.license === Number(budgetHunted.license)
              );
            });
          });

    if (budgetNotExists.length === 0) {
      await this.huntersRepository.save({
        id: hunterId,
        budgetsNormalized,
        statusProgressNormalized: StatusProgressDTO.COMPLETED,
        finishedAt: new Date(),
      });
      return budgetsExists;
    }

    const budgets = await this.saveBudgetsHunted(budgetNotExists);
    return budgets;
  }

  async verifyHunterStatus(
    hunterId: string,
  ): Promise<VerifyHunterStatusResponse> {
    const hunter = await this.huntersRepository.findById(hunterId);
    if (!hunter) {
      throw new AppError("Hunter not found");
    }
    if (hunter.statusProgressHunting !== StatusProgressDTO.COMPLETED) {
      return {
        hunter,
        hunterIsReady: false,
        message:
          "The Hunter is not in the correct status to convert the Budgets",
      };
    }

    if (hunter.statusProgressNormalized === StatusProgressDTO.COMPLETED) {
      return {
        hunter,
        hunterIsReady: false,
        message: "The Budgets have already been converted",
      };
    }

    return {
      hunter,
      hunterIsReady: true,
      message:
        "The Budget is being converted, please wait. You will be notified when the conversion is complete, with an expectation of 3 minutes for completion.",
    };
  }

  private async saveBudgetsHunted(
    budgetsNormalized: BudgetDTO[],
  ): Promise<BudgetEntity[]> {
    const budgets = await Promise.all(
      budgetsNormalized.map(async (budget) => {
        const customer = await this.customersRepository.create(budget.customer);

        const items = await Promise.all(
          budget.items.map(async (item) => {
            return await this.budgetItemsRepository.create({
              ...item,
            });
          }),
        );

        // const looseItems = await Promise.all(
        //   budget.looseItems.map(async (looseItem) => {
        //     return await this.budgetLooseItemsRepository.create({
        //       ...looseItem,
        //     });
        //   })
        // );

        const budgetsCreated = await this.budgetsRepository.create({
          ...budget,
          customerId: customer.id,
          itemsIds: items.map((item) => item.id),
          // looseItemsIds: looseItems.map((looseItem) => looseItem.id),
        });

        return budgetsCreated;
      }),
    );

    await this.huntersRepository.save({
      id: this.hunterId,
      budgetsNormalized,
      statusProgressNormalized: StatusProgressDTO.COMPLETED,
      finishedAt: new Date(),
    });

    return budgets;
  }
}
