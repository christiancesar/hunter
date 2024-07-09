import { ICreateCommissionDTO } from "../dtos/ICreateCommissionDTO";
import { IUpdateCommissionDTO } from "../dtos/IUpdateCommissionDTO";
import {
  CommissionDTO,
  EmployeeCommissionDTO,
} from "./prisma/CommissionsRepository";

export interface FindCommissionByPeriodParams {
  employeeId: string;
  startDate: Date;
  endDate: Date;
}

export interface ICommissionsRepository {
  create(data: ICreateCommissionDTO): Promise<CommissionDTO>;
  update(data: IUpdateCommissionDTO): Promise<CommissionDTO>;
  findById(id: string): Promise<CommissionDTO | null>;
  findByBudgetItemId(budgetItemId: string): Promise<CommissionDTO[]>;
  findByEmployeeId(employeeId: string): Promise<CommissionDTO[]>;
  findAll(): Promise<CommissionDTO[]>;
  findCommissionByPeriod(
    dates: FindCommissionByPeriodParams,
  ): Promise<CommissionDTO[]>;
  allCommissionsByEmployees(): Promise<EmployeeCommissionDTO[]>;
  delete(id: string): Promise<void>;
}
