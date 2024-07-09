import EmployeesRepository from "src/modules/employees/repositories/prisma/EmployeesRepository";
import CommissionsRepository from "../repositories/prisma/CommissionsRepository";
import MonthlyCommissionService from "../services/MonthlyCommissionService";
import BudgetItemsRepository from "src/modules/budgets/repositories/prisma/BudgetItemsRepository";
import { BudgetsRepository } from "src/modules/budgets/repositories/prisma/BudgetsRepository";

export class MonthlyCommissionServiceFactory {
  make() {
    const monthlyCommissionService = new MonthlyCommissionService({
      commissionsRepository: new CommissionsRepository(),
      employeesRepository: new EmployeesRepository(),
      budgetItemsRepository: new BudgetItemsRepository(),
      budgetsRepository: new BudgetsRepository(),
    });
    return monthlyCommissionService;
  }
}
