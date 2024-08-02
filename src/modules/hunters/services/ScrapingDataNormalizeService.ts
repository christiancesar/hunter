import { BudgetHuntedMapper } from "@shared/database/mappers/BudgetHuntedMapper";
import { IBudgetItemsRepository } from "src/modules/budgets/repositories/interfaces/IBudgetItemsRepository";
import { IBudgetsRepository } from "src/modules/budgets/repositories/interfaces/IBudgetsRepository";
import { ICustomersRepository } from "src/modules/budgets/repositories/interfaces/ICustomersRepository";
import { BudgetHuntedDTO } from "../dtos/BudgetHuntedDTO";

interface ICreateBudgetServiceParams {
  budgetsRepository: IBudgetsRepository;
  customersRepository: ICustomersRepository;
  budgetItemsRepository: IBudgetItemsRepository;
}

export class ScrapingDataNormalizeService {
  private budgetsRepository: IBudgetsRepository;
  private budgetItemsRepository: IBudgetItemsRepository;
  private customersRepository: ICustomersRepository;

  constructor({
    budgetsRepository,
    customersRepository,
    budgetItemsRepository,
  }: ICreateBudgetServiceParams) {
    this.budgetsRepository = budgetsRepository;
    this.customersRepository = customersRepository;
    this.budgetItemsRepository = budgetItemsRepository;
  }

  async execute(data: BudgetHuntedDTO): Promise<void> {
    const budgetNormalized = BudgetHuntedMapper.toDomain(data);
    const customer = await this.customersRepository.create(
      budgetNormalized.customer,
    );

    const budgetItemsIds = await this.budgetItemsRepository.createMany(
      budgetNormalized.items,
    );

    const budget = await this.budgetsRepository.create({
      shortId: budgetNormalized.shortId,
      customerId: customer.id,
      itemsIds: budgetItemsIds.map((item) => item.id),
      license: budgetNormalized.license,
      billedAt: budgetNormalized.billedAt,
      soldAt: budgetNormalized.soldAt,
      registeredAt: budgetNormalized.registeredAt,
      grossAmount: budgetNormalized.grossAmount,
      itemsCount: budgetNormalized.itemsCount,
      netAmount: budgetNormalized.netAmount,
      discountAmount: budgetNormalized.discountAmount,
      discountPercent: budgetNormalized.discountPercent,
      statusBudget: budgetNormalized.statusBudget,
      statusProducer: budgetNormalized.statusProducer,
      salesman: budgetNormalized.salesman,
    });

    console.log(`Budget ${budget.shortId} created successfully!`);
  }
}
