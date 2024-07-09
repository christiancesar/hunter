import BudgetItemsRepository from "src/modules/budgets/repositories/prisma/BudgetItemsRepository";
import CommissionsRepository from "../repositories/prisma/CommissionsRepository";
import UpdateCommissionService from "../services/comission/UpdateCommissionService";
import BudgetsRepository from "src/modules/budgets/repositories/prisma/BudgetsRepository";
import EmployeesRepository from "src/modules/employees/repositories/prisma/EmployeesRepository";
import ServiceTypeCommissionRepository from "../repositories/prisma/ServiceTypeCommissionRepository";

export class UpdateCommissionServiceFactory {
  make() {
    return new UpdateCommissionService({
      budgetItemsRepository: new BudgetItemsRepository(),
      budgetsRepository: new BudgetsRepository(),
      commissionsRepository: new CommissionsRepository(),
      employeesRepository: new EmployeesRepository(),
      serviceTypesCommissionRepository: new ServiceTypeCommissionRepository(),
    });
  }
}
