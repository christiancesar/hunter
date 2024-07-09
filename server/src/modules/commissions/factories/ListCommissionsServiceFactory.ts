import EmployeesRepository from "src/modules/employees/repositories/prisma/EmployeesRepository";
import CommissionsRepository from "../repositories/prisma/CommissionsRepository";
import ListCommissionsService from "../services/comission/ListCommissionsService";
import ServiceTypeCommissionRepository from "../repositories/prisma/ServiceTypeCommissionRepository";

export class ListCommissionsServiceFactory {
  make() {
    return new ListCommissionsService({
      commissionsRepository: new CommissionsRepository(),
      employeesRepository: new EmployeesRepository(),
    });
  }
}
