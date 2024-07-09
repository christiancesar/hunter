import { EmployeeEntity } from "src/modules/employees/entities/EmployeeEntity";
import { ServiceTypeCommissionEntity } from "./ServiceTypeCommissionEntity";

export type CommissionEntity = {
  id: string;
  employees: EmployeeEntity[];
  serviceTypeCommission: ServiceTypeCommissionEntity;
  employeeIds: string[];
  budgetShortId: number;
  budgetId: string;
  budgetItemId: string;
  budgetItemQuantity: number;
  budgetItemAmount: number;
  commissionPercent: number;
  divisionBy: number;
  commissionAmount: number;
  createdAt: Date;
  updatedAt: Date;
};
