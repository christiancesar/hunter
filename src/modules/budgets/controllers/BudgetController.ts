import { Request, Response } from "express";
import { CreateBudgetServiceFactory } from "../factories/CreateBudgetServiceFactory";
import BudgetsRepository from "../repositories/prisma/BudgetsRepository";
import ListAllBudgetsService from "../services/ListAllBudgetsService";
import ShowBudgetService from "../services/ShowBudgetService";

export default class BudgetController {
  async create(request: Request, response: Response): Promise<Response> {
    const { hunterId } = request.body;

    const createBudgetService = new CreateBudgetServiceFactory().make();
    const verified = await createBudgetService.verifyHunterStatus(hunterId);

    if (verified.hunterIsReady) createBudgetService.execute(hunterId);

    return response.json({
      hunter: verified.hunter,
      message: verified.message,
    });
  }

  async index(request: Request, response: Response): Promise<Response> {
    const budgetsRepository = new BudgetsRepository();
    const listAllBudgetsService = new ListAllBudgetsService(budgetsRepository);
    const budgets = await listAllBudgetsService.execute();
    return response.json(budgets);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const budgetsRepository = new BudgetsRepository();
    const showBudgetService = new ShowBudgetService(budgetsRepository);
    const budget = await showBudgetService.execute(id);
    return response.json(budget);
  }
}
