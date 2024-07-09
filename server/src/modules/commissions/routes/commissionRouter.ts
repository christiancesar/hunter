import { Router } from "express";
import serviceTypeCommissionRouter from "./serviceTypeCommissionRouter";
import CommissionController from "../controllers/CommissionController";
import CommissionReportController from "../controllers/CommissionReportController";
import { MonthlyCommissionController } from "../controllers/MonthlyCommissionController";

const commissionRouter = Router();
const commissionController = new CommissionController();
const commissionReportController = new CommissionReportController();
const monthlyCommissionController = new MonthlyCommissionController();

commissionRouter.use("/services", serviceTypeCommissionRouter);
commissionRouter.post("/", commissionController.create);
commissionRouter.get("/", commissionController.index);
commissionRouter.patch("/", commissionController.update);
commissionRouter.get("/report", commissionReportController.list);
commissionRouter.get("/monthly", monthlyCommissionController.show);

export default commissionRouter;
