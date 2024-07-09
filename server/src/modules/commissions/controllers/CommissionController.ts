import { Request, Response } from "express";
import { CreateCommissionServiceFactory } from "../factories/CreateCommissionServiceFactory";
import { ListCommissionsServiceFactory } from "../factories/ListCommissionsServiceFactory";
import { UpdateCommissionServiceFactory } from "../factories/UpdateCommissionServiceFactory";
import { updateCommissionBodySchameValidate } from "../utils/updateCommissionBodySchameValidate";
import { createCommissionBodySchameValidate } from "../utils/createCommissionBodySchameValidate";

export default class CommissionController {
  async create(request: Request, response: Response): Promise<Response> {
    const commissionBody = createCommissionBodySchameValidate(request.body);

    const createCommissionService = new CreateCommissionServiceFactory().make();

    const commission = await createCommissionService.execute(commissionBody);

    return response.json(commission);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { employeeId } = request.query as { employeeId: string };

    const listCommissionsService = new ListCommissionsServiceFactory().make();
    const commissions = await listCommissionsService.execute({ employeeId });

    return response.json(commissions);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const commissionBody = updateCommissionBodySchameValidate(request.body);

    const updateCommissionService = new UpdateCommissionServiceFactory().make();

    const commission = await updateCommissionService.execute(commissionBody);

    return response.json(commission);
  }
}
