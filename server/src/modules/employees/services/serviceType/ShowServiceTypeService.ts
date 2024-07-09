import { AppError } from "@shared/errors/AppError";
import { ServiceTypeEntity } from "../../entities/ServiceTypeEntity";
import { IServiceTypesRepository } from "../../repositories/IServiceTypesRepository";

export default class ShowServiceTypeService {
  constructor(private serviceTypesRepository: IServiceTypesRepository) {
    this.serviceTypesRepository = serviceTypesRepository;
  }

  async execute(id: string): Promise<ServiceTypeEntity> {
    if (!id) {
      throw new AppError("Service type Id is required");
    }

    const serviceType = await this.serviceTypesRepository.findById(id);

    if (!serviceType) {
      throw new AppError(`Service type with id ${id} not found`);
    }

    return serviceType;
  }
}
