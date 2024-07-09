import { Request, Response } from "express";
import { MonthlyCommissionServiceFactory } from "../factories/MonthlyCommissionServiceFactory";

export class MonthlyCommissionController {
  async show(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate } = request.query as {
      startDate: string;
      endDate: string;
    };
    const monthlyCommissionService =
      new MonthlyCommissionServiceFactory().make();
    const commissionManager = await monthlyCommissionService.execute({
      startDate,
      endDate,
    });
    return response.json(commissionManager);
  }
}
