import { AppError } from "@shared/errors/AppError";
import { ICreateServiceTypeCommissionDTO } from "../../dtos/ICreateServiceTypeCommissionDTO";
import { IServiceTypesCommissionRepository } from "../../repositories/IServiceTypesCommissionRepository";

export default class CreateServiceTypeCommissionService {
  private serviceTypeCommissionRepository: IServiceTypesCommissionRepository;
  constructor(
    serviceTypeCommissionRepository: IServiceTypesCommissionRepository,
  ) {
    this.serviceTypeCommissionRepository = serviceTypeCommissionRepository;
  }
  async execute({ name }: ICreateServiceTypeCommissionDTO) {
    if (!name) {
      throw new AppError("Name is required");
    }

    const serviceTypeCommissionAlreadyExists =
      await this.serviceTypeCommissionRepository.findByName(name);

    if (serviceTypeCommissionAlreadyExists) {
      throw new AppError("Service Type Commission already exists");
    }

    const serviceTypeCommission =
      await this.serviceTypeCommissionRepository.create({
        name,
      });

    return serviceTypeCommission;
  }
}
