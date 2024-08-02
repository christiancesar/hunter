import { Router } from "express";
import HunterController from "../controllers/HunterController";

const hunterRouter = Router();
const hunterController = new HunterController();

hunterRouter.post("/", hunterController.create);
hunterRouter.get("/", hunterController.index);
hunterRouter.get("/:id", hunterController.show);
export default hunterRouter;
