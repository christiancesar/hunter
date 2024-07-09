import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";

import { IUpdateEmployeeDTO } from "../dtos/IUpdateEmployeeDTO";

import { EmployeeEntity } from "../entities/EmployeeEntity";
import { EmployeeDTO } from "../mappers/EmployeeMapper";

export interface IEmployeesRepository {
  findById(id: string): Promise<EmployeeDTO | null>;

  findByEmployeeName(name: string): Promise<EmployeeDTO | null>;

  create(data: ICreateEmployeeDTO): Promise<EmployeeDTO>;

  save(employee: IUpdateEmployeeDTO): Promise<EmployeeDTO>;

  listall(): Promise<EmployeeDTO[]>;

  deleteAll(): Promise<void>;
}
