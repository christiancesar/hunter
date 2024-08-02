import { Logger } from "@shared/loggers/Logger";
import { Request, Response } from "express";
import HuntersRepository from "../repositories/prisma/HuntersRepository";
import {
  BudgetHunterBuilderService,
  BudgetStatus,
} from "../services/BudgetHunterService";
import ListAllHuntersJobService from "../services/ListAllHuntersJobService";
import ShowHunterJobService from "../services/ShowHunterJobService";

type GetBudgetHunterRequestParams = {
  filter: {
    initialDate: string;
    finalDate: string;
    budgetStatus: BudgetStatus;
    budgetId: number;
    huntPagesQuantity: number;
  };
};

export default class HunterController {
  async create(request: Request, response: Response): Promise<Response> {
    const { filter } = request.body as GetBudgetHunterRequestParams;

    const budgetHuntService = new BudgetHunterBuilderService();
    const budgetHunter = budgetHuntService.build();

    const logger = new Logger(true);
    budgetHunter.addObserver(logger);
    budgetHunter.toHunt(filter);

    return response.status(200).json();
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const huntersRepository = new HuntersRepository();
    const showHunterJobService = new ShowHunterJobService(huntersRepository);
    const hunter = await showHunterJobService.execute(id);
    return response.json(hunter);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const huntersRepository = new HuntersRepository();
    const listAllHuntersJobService = new ListAllHuntersJobService(
      huntersRepository,
    );
    const hunters = await listAllHuntersJobService.execute();
    return response.json(hunters);
  }
}
