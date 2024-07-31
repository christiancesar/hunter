import HuntersRepository from "src/modules/hunters/repositories/prisma/HuntersRepository";
import CreateBudgetService from "../services/CreateBudgetService";
import BudgetItemsRepository from "../repositories/prisma/BudgetItemsRepository";
import BudgetLooseItemsRepository from "../repositories/prisma/BudgetLooseItemsRepository";
import BudgetsRepository from "../repositories/prisma/BudgetsRepository";
import CustomersRepository from "../repositories/prisma/CustomersRepository";

export class CreateBudgetServiceFactory {
  make() {
    return new CreateBudgetService({
      budgetItemsRepository: new BudgetItemsRepository(),
      budgetLooseItemsRepository: new BudgetLooseItemsRepository(),
      budgetsRepository: new BudgetsRepository(),
      customersRepository: new CustomersRepository(),
      huntersRepository: new HuntersRepository(),
    });
  }
}
