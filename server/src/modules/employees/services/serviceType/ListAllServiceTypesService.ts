import { ServiceTypeEntity } from "../../entities/ServiceTypeEntity";
import { IServiceTypesRepository } from "../../repositories/IServiceTypesRepository";

export default class ListAllServiceTypesService {
  private serviceTypesRepository: IServiceTypesRepository;
  constructor(serviceTypesRepository: IServiceTypesRepository) {
    this.serviceTypesRepository = serviceTypesRepository;
  }

  async execute(): Promise<ServiceTypeEntity[]> {
    const serviceTypes = await this.serviceTypesRepository.listAll();
    return serviceTypes;
  }
}
