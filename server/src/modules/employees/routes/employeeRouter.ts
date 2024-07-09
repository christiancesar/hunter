import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController";
import serviceTypeRouter from "./serviceTypeRouter";

const employeeRouter = Router();
const employeeController = new EmployeeController();
employeeRouter.use("/services", serviceTypeRouter);

employeeRouter.get("/", employeeController.index);
employeeRouter.get("/:id", employeeController.show);
employeeRouter.post("/", employeeController.create);
employeeRouter.patch("/", employeeController.update);

export default employeeRouter;
