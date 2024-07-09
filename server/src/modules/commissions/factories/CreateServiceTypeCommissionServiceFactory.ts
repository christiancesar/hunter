import ServiceTypeCommissionRepository from "../repositories/prisma/ServiceTypeCommissionRepository";
import CreateServiceTypeCommissionService from "../services/serviceTypeCommission/CreateServiceTypeCommissionService";

export class CreateServiceTypeCommissionServiceFactory {
  make() {
    return new CreateServiceTypeCommissionService(
      new ServiceTypeCommissionRepository(),
    );
  }
}
