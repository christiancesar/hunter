import BudgetItemsRepository from "src/modules/budgets/repositories/prisma/BudgetItemsRepository";
import { ScrapingDataNormalizeService } from "../services/ScrapingDataNormalizeService";
import BudgetsRepository from "src/modules/budgets/repositories/prisma/BudgetsRepository";
import CustomersRepository from "src/modules/budgets/repositories/prisma/CustomersRepository";

export class ScrapingDataNormalizeServiceFactory {
  static make() {
    return new ScrapingDataNormalizeService({
      budgetItemsRepository: new BudgetItemsRepository(),
      budgetsRepository: new BudgetsRepository(),
      customersRepository: new CustomersRepository(),
    });
  }
}
