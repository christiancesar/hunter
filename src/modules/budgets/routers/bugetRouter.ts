import { Router } from "express";
import BudgetController from "../controllers/BudgetController";
import { ListBudgetsController } from "../controllers/ListBudgetsController";

const budgetRouter = Router();
const budgetController = new BudgetController();
const listBudgetsController = new ListBudgetsController();
budgetRouter.get("/", listBudgetsController.index);
budgetRouter.get("/:id", budgetController.show);
export default budgetRouter;
