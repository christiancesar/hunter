import { Router } from "express";
import ServiceTypeCommissionController from "../controllers/ServiceTypesCommissionController";

const serviceTypeCommissionRouter = Router();
const serviceTypeCommissionController = new ServiceTypeCommissionController();

serviceTypeCommissionRouter.post("/", serviceTypeCommissionController.create);

serviceTypeCommissionRouter.get("/", serviceTypeCommissionController.index);

serviceTypeCommissionRouter.patch("/", serviceTypeCommissionController.update);
export default serviceTypeCommissionRouter;
