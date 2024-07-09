import { Request, Response } from "express";
import compilepdf from "../services/report/compilepdf";
import CommissionsRepository from "../repositories/prisma/CommissionsRepository";

export default class CommissionReportController {
  async index(request: Request, response: Response): Promise<Response> {
    const pdf = await compilepdf();
    response.setHeader("Content-Type", "application/pdf");
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=export.pdf",
    );

    return response.send(pdf);
    // return report.pipe(response);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const commissionsRepository = new CommissionsRepository();
    const commissions = await commissionsRepository.allCommissionsByEmployees();

    return response.json(commissions);
  }
}
