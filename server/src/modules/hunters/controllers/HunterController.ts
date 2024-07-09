import { Logger } from "@shared/loggers/Logger";
import { Request, Response } from "express";
import {
  BudgetHunterBuilderService,
  HuntParams,
} from "../services/BudgetHunterService";
import CreateJobHuntService from "../services/CreateJobHuntService";
import ListAllHuntersJobService from "../services/ListAllHuntersJobService";
import HuntersRepository from "../repositories/prisma/HuntersRepository";
import ShowHunterJobService from "../services/ShowHunterJobService";

type GetBudgetHunterRequestParams = {
  credentials: {
    user: string;
    password: string;
    license: string;
    url: string;
  };
} & HuntParams;

export default class HunterController {
  async create(request: Request, response: Response): Promise<Response> {
    const { credentials, filter, huntPagesQuantity } =
      request.body as GetBudgetHunterRequestParams;

    const huntersRepository = new HuntersRepository();
    const createJobHuntService = new CreateJobHuntService(huntersRepository);
    const hunter = await createJobHuntService.execute({
      credentials: {
        user: credentials.user,
        password: credentials.password,
        license: credentials.license,
      },
      filter: {
        budgetId: filter.budgetId,
        budgetStatus: filter.budgetStatus,
        finalDate: filter.finalDate,
        huntPagesQuantity,
        initialDate: filter.initialDate,
      },
    });

    const budgetHuntService = new BudgetHunterBuilderService();
    const budgetHunter = budgetHuntService
      .setUser(credentials.user)
      .setPassword(credentials.password)
      .setLicense(credentials.license)
      .setUrl(credentials.url)
      .build();

    const logger = new Logger(true);
    budgetHunter.addObserver(logger);

    budgetHunter.toHunt(
      { filter, huntPagesQuantity },
      hunter.id,
      huntersRepository,
    );

    return response.json(hunter);
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
