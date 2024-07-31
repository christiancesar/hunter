import { Router } from "express";
import hunterRouter from "./modules/hunters/routers/hunterRouter";

export const routes = Router();

routes.use("/hunters", hunterRouter);
