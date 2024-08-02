import { Router } from "express";
import hunterRouter from "./modules/hunters/routers/hunterRouter";
import budgetRouter from "./modules/budgets/routers/bugetRouter";
import customerRouter from "./modules/budgets/routers/customersRouter";
export const routes = Router();

routes.use("/hunters", hunterRouter);
routes.use("/budgets", budgetRouter);
routes.use("/customers", customerRouter);
