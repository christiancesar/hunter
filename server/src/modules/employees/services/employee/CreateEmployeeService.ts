import { AppError } from "@shared/errors/AppError";
import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";
import { IServiceTypesRepository } from "../../repositories/IServiceTypesRepository";
import { EmployeeDTO } from "../../mappers/EmployeeMapper";

export interface ICreateEmployeeServiceDTO {
  name: string;

  serviceTypeIds: string[];
}

export default class CreateEmployeeService {
  private employeesRepository: IEmployeesRepository;
  private serviceTypeRepository: IServiceTypesRepository;

  constructor(
    employeesRepository: IEmployeesRepository,
    serviceTypesRepository: IServiceTypesRepository,
  ) {
    this.employeesRepository = employeesRepository;
    this.serviceTypeRepository = serviceTypesRepository;
  }

  async execute({
    name,
    serviceTypeIds,
  }: ICreateEmployeeServiceDTO): Promise<EmployeeDTO> {
    if (!name) {
      throw new AppError("Name is required");
    }

    if (!serviceTypeIds) {
      throw new AppError("Service types are required");
    }

    await Promise.all(
      serviceTypeIds.map(async (serviceTypeId) => {
        const serviceType = await this.serviceTypeRepository.findById(
          serviceTypeId,
        );

        if (!serviceType) {
          throw new AppError(`Service type with id ${serviceTypeId} not found`);
        }
      }),
    );

    const employeeAlreadyExists =
      await this.employeesRepository.findByEmployeeName(name);

    if (employeeAlreadyExists) {
      throw new AppError("Employee already exists");
    }

    const employee = await this.employeesRepository.create({
      name,
    });

    this.employeesRepository.save({
      id: employee.id,

      name: employee.name,

      serviceTypeIds,
    });

    return employee;
  }
}
