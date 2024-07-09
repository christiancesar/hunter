import { Router } from "express";
import ServiceTypeController from "../controllers/ServiceTypeController";

const serviceTypeRouter = Router();
const serviceTypeController = new ServiceTypeController();
serviceTypeRouter.get("/", serviceTypeController.index);
serviceTypeRouter.get("/:id", serviceTypeController.show);
serviceTypeRouter.post("/", serviceTypeController.create);
serviceTypeRouter.patch("/", serviceTypeController.update);

export default serviceTypeRouter;
