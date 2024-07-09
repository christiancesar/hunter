import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { EmployeeDTO } from "../../mappers/EmployeeMapper";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";

export default class ShowEmployeeService {
  constructor(private employeesRepository: IEmployeesRepository) {
    this.employeesRepository = employeesRepository;
  }

  async execute(id: string): Promise<EmployeeDTO> {
    const employee = await this.employeesRepository.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }
}
