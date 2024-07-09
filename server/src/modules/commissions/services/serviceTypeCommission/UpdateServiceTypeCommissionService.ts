import { AppError } from "@shared/errors/AppError";
import { IUpdateServiceTypeCommissionDTO } from "../../dtos/IUpdateServiceTypeCommissionDTO";
import { IServiceTypesCommissionRepository } from "../../repositories/IServiceTypesCommissionRepository";

export default class UpdateServiceTypeCommissionService {
  private serviceTypeCommissionRepository: IServiceTypesCommissionRepository;
  constructor(
    serviceTypeCommissionRepository: IServiceTypesCommissionRepository,
  ) {
    this.serviceTypeCommissionRepository = serviceTypeCommissionRepository;
  }
  async execute({ id, name }: IUpdateServiceTypeCommissionDTO) {
    if (!id) {
      throw new AppError("Id is required");
    }

    if (!name) {
      throw new AppError("Name is required");
    }

    const serviceTypeCommission =
      await this.serviceTypeCommissionRepository.findById(id);

    if (!serviceTypeCommission) {
      throw new AppError("Service Type Commission not found");
    }

    const serviceTypeCommissionAlreadyExists =
      await this.serviceTypeCommissionRepository.findByName(name);

    if (
      serviceTypeCommissionAlreadyExists &&
      serviceTypeCommissionAlreadyExists.id !== id
    ) {
      throw new AppError("Service Type Commission already exists");
    }

    serviceTypeCommission.name = name;

    const updatedServiceTypeCommission =
      await this.serviceTypeCommissionRepository.update(serviceTypeCommission);

    return updatedServiceTypeCommission;
  }
}
