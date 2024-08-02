import { Request, Response } from "express";
import BudgetsRepository from "../repositories/prisma/BudgetsRepository";
import ListAllBudgetsService from "../services/ListAllBudgetsService";
import { z } from "zod";

export class ListBudgetsController {
  async index(request: Request, response: Response): Promise<Response> {
    const listBudgetsQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    });
    const { page } = listBudgetsQuerySchema.parse(request.query);

    const budgetsRepository = new BudgetsRepository();
    const listAllBudgetsService = new ListAllBudgetsService(budgetsRepository);
    const budgets = await listAllBudgetsService.execute(page);
    return response.json(budgets);
  }
}
