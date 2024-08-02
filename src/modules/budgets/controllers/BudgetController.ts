import { Request, Response } from "express";
import BudgetsRepository from "../repositories/prisma/BudgetsRepository";
import ShowBudgetService from "../services/ShowBudgetService";

export default class BudgetController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const budgetsRepository = new BudgetsRepository();
    const showBudgetService = new ShowBudgetService(budgetsRepository);
    const budget = await showBudgetService.execute(id);
    return response.json(budget);
  }
}
