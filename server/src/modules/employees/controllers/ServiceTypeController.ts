import { Request, Response } from "express";
import ServiceTypesRepository from "../repositories/prisma/ServiceTypesRepository";
import ListAllServiceTypesService from "../services/serviceType/ListAllServiceTypesService";
import CreateServiceTypeService from "../services/serviceType/CreateServiceTypeService";
import ShowServiceTypeService from "../services/serviceType/ShowServiceTypeService";
import UpdateServiceTypeService from "../services/serviceType/UpdateServiceTypeService";

export default class ServiceTypeController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, commissionPercent } = request.body;
    const serviceTypesRepository = new ServiceTypesRepository();
    const createServiceTypeService = new CreateServiceTypeService(
      serviceTypesRepository,
    );

    const serviceType = await createServiceTypeService.execute({
      name,
      commissionPercent,
    });

    return response.json(serviceType);
  }
  async index(request: Request, response: Response): Promise<Response> {
    const serviceTypesRepository = new ServiceTypesRepository();
    const listAllServiceTypesService = new ListAllServiceTypesService(
      serviceTypesRepository,
    );
    const serviceTypes = await listAllServiceTypesService.execute();
    return response.json(serviceTypes);
  }
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const serviceTypesRepository = new ServiceTypesRepository();
    const showServiceTypeService = new ShowServiceTypeService(
      serviceTypesRepository,
    );

    const serviceType = await showServiceTypeService.execute(id);
    return response.json(serviceType);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, name, commissionPercent } = request.body;
    const serviceTypesRepository = new ServiceTypesRepository();
    const updateServiceTypeService = new UpdateServiceTypeService(
      serviceTypesRepository,
    );

    const serviceType = await updateServiceTypeService.execute({
      id,
      name,
      commissionPercent,
    });

    return response.json(serviceType);
  }
}
