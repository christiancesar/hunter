import { ServiceTypeCommissionEntity } from "../../entities/ServiceTypeCommissionEntity";
import { IServiceTypesCommissionRepository } from "../../repositories/IServiceTypesCommissionRepository";

export default class ListAllServiceTypeCommissionService {
  private serviceTypeCommissionRepository: IServiceTypesCommissionRepository;
  constructor(
    serviceTypeCommissionRepository: IServiceTypesCommissionRepository,
  ) {
    this.serviceTypeCommissionRepository = serviceTypeCommissionRepository;
  }
  async execute(): Promise<ServiceTypeCommissionEntity[]> {
    const serviceTypeCommission =
      await this.serviceTypeCommissionRepository.listAll();
    return serviceTypeCommission;
  }
}
