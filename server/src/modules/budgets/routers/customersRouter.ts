import { Router } from "express";
import CustomerController from "../controllers/CustomerController";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get("/", customerController.index);
customerRouter.get("/:id", customerController.show);
export default customerRouter;
