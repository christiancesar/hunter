import BudgetItemsRepository from "src/modules/budgets/repositories/prisma/BudgetItemsRepository";
import { BudgetsRepository } from "src/modules/budgets/repositories/prisma/BudgetsRepository";
import EmployeesRepository from "src/modules/employees/repositories/prisma/EmployeesRepository";
import CommissionsRepository from "../repositories/prisma/CommissionsRepository";
import ServiceTypeCommissionRepository from "../repositories/prisma/ServiceTypeCommissionRepository";
import CreateCommissionService from "../services/comission/CreateCommissionService";

export class CreateCommissionServiceFactory {
  make() {
    return new CreateCommissionService({
      commissionsRepository: new CommissionsRepository(),
      employeesRepository: new EmployeesRepository(),
      budgetItemsRepository: new BudgetItemsRepository(),
      budgetsRepository: new BudgetsRepository(),
      serviceTypesCommissionRepository: new ServiceTypeCommissionRepository(),
    });
  }
}
