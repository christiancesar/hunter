import { Router } from "express";
import commissionRouter from "./modules/commissions/routes/commissionRouter";
import budgetRouter from "./modules/budgets/routers/bugetRouter";
import customerRouter from "./modules/budgets/routers/customersRouter";
import employeeRouter from "./modules/employees/routes/employeeRouter";
import hunterRouter from "./modules/hunters/routers/hunterRouter";

export const routes = Router();

routes.use("/commissions", commissionRouter);
routes.use("/budgets", budgetRouter);
routes.use("/customers", customerRouter);
routes.use("/employees", employeeRouter);
routes.use("/hunters", hunterRouter);
