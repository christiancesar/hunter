import { IEmployeesRepository } from "src/modules/employees/repositories/IEmployeesRepository";
import { ICommissionsRepository } from "../../repositories/ICommissionsRepository";
import { IServiceTypesCommissionRepository } from "../../repositories/IServiceTypesCommissionRepository";
import { IBudgetsRepository } from "src/modules/budgets/repositories/interfaces/IBudgetsRepository";
import { IBudgetItemsRepository } from "src/modules/budgets/repositories/interfaces/IBudgetItemsRepository";
import { AppError } from "@shared/errors/AppError";

interface IUpdateCommissionServiceConstructorDTO {
  commissionsRepository: ICommissionsRepository;
  employeesRepository: IEmployeesRepository;
  serviceTypesCommissionRepository: IServiceTypesCommissionRepository;
  budgetsRepository: IBudgetsRepository;
  budgetItemsRepository: IBudgetItemsRepository;
}

type UpdateCommissionServiceParams = {
  id: string;
  employeeIds: string[];
  budgetShortId: number;
  budgetId: string;
  budgetItemId: string;
  budgetItemQuantity: number;
  budgetItemAmount: number;
  commissionPercent: number;
  divisionBy: number;
  serviceTypeCommissionId: string;
};

export default class UpdateCommissionService {
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
  }: IUpdateCommissionServiceConstructorDTO) {
    this.commissionsRepository = commissionsRepository;
    this.employeesRepository = employeesRepository;
    this.serviceTypesCommissionRepository = serviceTypesCommissionRepository;
    this.budgetsRepository = budgetsRepository;
    this.budgetItemsRepository = budgetItemsRepository;
  }

  async execute({
    id,
    employeeIds,
    budgetShortId,
    budgetId,
    budgetItemId,
    budgetItemQuantity,
    budgetItemAmount,
    commissionPercent,
    divisionBy,
    serviceTypeCommissionId,
  }: UpdateCommissionServiceParams) {
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
      if (budgetItemQuantityTotal.quantity !== budgetItemQuantity) {
        if (
          budgetItemQuantityTotal.quantity <
          budgetItemQuantityReleased + budgetItemQuantity
        ) {
          throw new AppError(
            `The quantity of the budget item ${budgetItemId} is exceeded`,
          );
        }
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

    return await this.commissionsRepository.update({
      id,
      employeeIds,
      budgetShortId,
      budgetId,
      budgetItemId,
      budgetItemQuantity,
      budgetItemAmount,
      commissionPercent,
      divisionBy,
      commissionAmount,
      serviceTypeCommissionId,
    });
  }
}
