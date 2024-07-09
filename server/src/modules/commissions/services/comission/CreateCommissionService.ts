import { IEmployeesRepository } from "src/modules/employees/repositories/IEmployeesRepository";
import { ICommissionsRepository } from "../../repositories/ICommissionsRepository";
import { IServiceTypesCommissionRepository } from "../../repositories/IServiceTypesCommissionRepository";
import { ICreateCommissionDTO } from "../../dtos/ICreateCommissionDTO";
import { IBudgetsRepository } from "src/modules/budgets/repositories/interfaces/IBudgetsRepository";
import { IBudgetItemsRepository } from "src/modules/budgets/repositories/interfaces/IBudgetItemsRepository";
import { AppError } from "@shared/errors/AppError";

interface ICreateCommissionServiceConstructorDTO {
  commissionsRepository: ICommissionsRepository;
  employeesRepository: IEmployeesRepository;
  serviceTypesCommissionRepository: IServiceTypesCommissionRepository;
  budgetsRepository: IBudgetsRepository;
  budgetItemsRepository: IBudgetItemsRepository;
}

export default class CreateCommissionService {
  private commissionsRepository: ICommissionsRepository;
  private employeesRepository: IEmployeesRepository;
  private serviceTypesCommissionRepository: IServiceTypesCommissionRepository;
  private budgetsRepository: IBudgetsRepository;
  private budgetItemsRepository: IBudgetItemsRepository;
  constructor({
    budgetsRepository,
    commissionsRepository,
    employeesRepository,
    serviceTypesCommissionRepository,
    budgetItemsRepository,
  }: ICreateCommissionServiceConstructorDTO) {
    this.commissionsRepository = commissionsRepository;
    this.employeesRepository = employeesRepository;
    this.serviceTypesCommissionRepository = serviceTypesCommissionRepository;
    this.budgetsRepository = budgetsRepository;
    this.budgetItemsRepository = budgetItemsRepository;
  }

  async execute({
    budgetShortId,
    budgetId,
    budgetItemId,
    budgetItemQuantity,
    budgetItemAmount,
    commissionPercent,
    divisionBy,
    employeeIds,
    serviceTypeCommissionId,
  }: Omit<ICreateCommissionDTO, "commissionAmount">) {
    const budgetItemQuantityTotal = await this.budgetItemsRepository.findById(
      budgetItemId,
    );

    const budgetItemQuantityReleased = (
      await this.commissionsRepository.findByBudgetItemId(budgetItemId)
    )
      .filter(
        (commission) =>
          commission.serviceTypeCommission.id === serviceTypeCommissionId,
      )
      .reduce((acc, commission) => acc + commission.budgetItemQuantity, 0);

    if (budgetItemQuantityTotal) {
      if (
        budgetItemQuantityTotal.quantity <
        budgetItemQuantityReleased + budgetItemQuantity
      ) {
        throw new AppError(
          `The quantity of the budget item ${budgetItemId} is exceeded`,
        );
      }
    }

    await Promise.all(
      employeeIds.map(async (employeeId) => {
        const employee = await this.employeesRepository.findById(employeeId);
        if (!employee) {
          throw new Error(`Employee not found with id ${employeeId}`);
        }
        return employee;
      }),
    );

    const serviceTypeCommission =
      await this.serviceTypesCommissionRepository.findById(
        serviceTypeCommissionId,
      );

    if (!serviceTypeCommission) {
      throw new Error(
        `Service type commission not found with id ${serviceTypeCommissionId}`,
      );
    }

    const budgetIdExists = await this.budgetsRepository.findById(budgetId);
    if (!budgetIdExists) {
      throw new Error(`Budget item not found with id ${budgetId}`);
    }

    const budgetItemIdExists = await this.budgetItemsRepository.findById(
      budgetItemId,
    );

    if (!budgetItemIdExists) {
      throw new Error(`Budget item not found with id ${budgetItemId}`);
    }

    const commissionAmount =
      (budgetItemAmount * commissionPercent) / 100 / divisionBy;

    const commission = await this.commissionsRepository.create({
      budgetId,
      budgetShortId,
      budgetItemId,
      budgetItemQuantity,
      budgetItemAmount,
      commissionPercent,
      divisionBy,
      commissionAmount,
      employeeIds,
      serviceTypeCommissionId,
    });

    return commission;
  }
}
