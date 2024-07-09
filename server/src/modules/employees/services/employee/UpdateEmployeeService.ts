import { AppError } from "@shared/errors/AppError";
import { IUpdateEmployeeDTO } from "../../dtos/IUpdateEmployeeDTO";
import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";
import { EmployeeDTO } from "../../mappers/EmployeeMapper";

export default class UpdateEmployeeService {
  constructor(private employeesRepository: IEmployeesRepository) {
    this.employeesRepository = employeesRepository;
  }

  async execute({
    id,
    name,
    serviceTypeIds,
  }: IUpdateEmployeeDTO): Promise<EmployeeDTO> {
    const employee = await this.employeesRepository.findById(id);

    if (!employee) {
      throw new AppError("Employee not found");
    }

    const updatedEmployee = await this.employeesRepository.save({
      id,
      name,
      serviceTypeIds,
    });

    return updatedEmployee;
  }
}
