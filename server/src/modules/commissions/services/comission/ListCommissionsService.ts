import { IEmployeesRepository } from "src/modules/employees/repositories/IEmployeesRepository";
import { ICommissionsRepository } from "../../repositories/ICommissionsRepository";
type SearchCommissionsServiceParams = {
  employeeId?: string;
};

interface ListCommissionsServiceConstructor {
  commissionsRepository: ICommissionsRepository;
  employeesRepository: IEmployeesRepository;
}
export default class ListCommissionsService {
  private commissionsRepository: ICommissionsRepository;
  private employeesRepository: IEmployeesRepository;
  constructor({
    commissionsRepository,
    employeesRepository,
  }: ListCommissionsServiceConstructor) {
    this.commissionsRepository = commissionsRepository;
    this.employeesRepository = employeesRepository;
  }

  async execute({ employeeId }: SearchCommissionsServiceParams) {
    if (employeeId) {
      const employee = await this.employeesRepository.findById(employeeId);
      if (!employee) {
        throw new Error("Employee not found");
      }
      return await this.commissionsRepository.findByEmployeeId(employeeId);
    }
    return await this.commissionsRepository.findAll();
  }
}
