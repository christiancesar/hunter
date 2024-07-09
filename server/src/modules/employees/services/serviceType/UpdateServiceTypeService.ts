import { AppError } from "@shared/errors/AppError";
import { IUpdateServiceTypeDTO } from "../../dtos/IUpdateServiceTypeDTO";
import { IServiceTypesRepository } from "../../repositories/IServiceTypesRepository";

export default class UpdateServiceTypeService {
  private serviceTypesRepository: IServiceTypesRepository;
  constructor(serviceTypesRepository: IServiceTypesRepository) {
    this.serviceTypesRepository = serviceTypesRepository;
  }

  async execute({ id, name, commissionPercent }: IUpdateServiceTypeDTO) {
    const serviceType = await this.serviceTypesRepository.findById(id);

    if (!serviceType) {
      throw new AppError("Service type not exist!");
    }

    if (name !== undefined && name.trim() === "") {
      throw new AppError("Name can't be empty!");
    }

    if (commissionPercent !== undefined && commissionPercent <= 0) {
      throw new AppError("Commission percent must be greater than 0!");
    }

    if (!name && !commissionPercent) {
      throw new AppError("Name or commission percent must be sent!");
    }

    if (name) {
      const serviceTypeNameAlreadyExists =
        await this.serviceTypesRepository.findByName(name);

      if (serviceTypeNameAlreadyExists) {
        throw new AppError("Service type name already exists");
      }
    }

    const serviceTypeUpdated = await this.serviceTypesRepository.save({
      id,
      name,
      commissionPercent,
    });

    return serviceTypeUpdated;
  }
}
