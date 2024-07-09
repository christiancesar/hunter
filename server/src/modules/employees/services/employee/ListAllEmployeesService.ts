import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { EmployeeDTO } from "../../mappers/EmployeeMapper";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";

export default class ListAllEmployeesService {
  private employeesRepository: IEmployeesRepository;
  constructor(employeesRepository: IEmployeesRepository) {
    this.employeesRepository = employeesRepository;
  }

  async execute(): Promise<EmployeeDTO[]> {
    const employees = await this.employeesRepository.listall();
    return employees;
  }
}
