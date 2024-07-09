import { Request, Response } from "express";
import { CreateServiceTypeCommissionServiceFactory } from "../factories/CreateServiceTypeCommissionServiceFactory";
import ServiceTypeCommissionRepository from "../repositories/prisma/ServiceTypeCommissionRepository";
import ListAllServiceTypeCommissionService from "../services/serviceTypeCommission/ListAllServiceTypeCommission";
import UpdateServiceTypeCommissionService from "../services/serviceTypeCommission/UpdateServiceTypeCommissionService";

export default class ServiceTypesCommissionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createServiceTypeCommissionService =
      new CreateServiceTypeCommissionServiceFactory().make();
    const serviceTypeCommission =
      await createServiceTypeCommissionService.execute({ name });
    return response.json({ serviceTypeCommission });
  }

  async index(request: Request, response: Response): Promise<Response> {
    const serviceTypeCommissionRepository =
      new ServiceTypeCommissionRepository();
    const listAllServiceTypeCommissionService =
      new ListAllServiceTypeCommissionService(serviceTypeCommissionRepository);
    const serviceTypeCommissions =
      await listAllServiceTypeCommissionService.execute();
    return response.json({ serviceTypeCommissions });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;
    const serviceTypeCommissionRepository =
      new ServiceTypeCommissionRepository();
    const updateServiceTypeCommissionService =
      new UpdateServiceTypeCommissionService(serviceTypeCommissionRepository);
    const serviceTypeCommission =
      await updateServiceTypeCommissionService.execute({
        id,
        name,
      });
    return response.json({ serviceTypeCommission });
  }
}
