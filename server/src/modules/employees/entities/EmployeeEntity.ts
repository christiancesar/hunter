import { CommissionEntity } from "../../commissions/entities/CommissionEntity";
import { ServiceTypeEntity } from "./ServiceTypeEntity";

export type EmployeeEntity = {
  id: string;
  name: string;
  serviceTypes: ServiceTypeEntity[];
  comissionIds: string[];
  commissions: CommissionEntity[];
  serviceTypeIds: string[];
  createdAt: Date;
  updatedAt: Date;
};
