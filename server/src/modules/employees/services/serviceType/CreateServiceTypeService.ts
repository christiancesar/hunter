import { AppError } from "@shared/errors/AppError";
import { ICreateServiceTypeDTO } from "../../dtos/ICreateServiceTypeDTO";
import { IServiceTypesRepository } from "../../repositories/IServiceTypesRepository";

export default class CreateServiceTypeService {
  private serviceTypesRepository: IServiceTypesRepository;
  constructor(serviceTypesRepository: IServiceTypesRepository) {
    this.serviceTypesRepository = serviceTypesRepository;
  }

  async execute({ name, commissionPercent }: ICreateServiceTypeDTO) {
    if (!name) {
      throw new AppError("Name is required");
    }

    const serviceTypeAlreadyExists =
      await this.serviceTypesRepository.findByName(name);

    if (serviceTypeAlreadyExists) {
      throw new AppError(`Service type "${name}" already exists`);
    }

    const serviceType = await this.serviceTypesRepository.create({
      name,
      commissionPercent,
    });
    return serviceType;
  }
}
