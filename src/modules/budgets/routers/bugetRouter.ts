import { Router } from "express";
import BudgetController from "../controllers/BudgetController";

const budgetRouter = Router();
const budgetController = new BudgetController();
budgetRouter.post("/", budgetController.create);
budgetRouter.get("/", budgetController.index);
budgetRouter.get("/:id", budgetController.show);
export default budgetRouter;
