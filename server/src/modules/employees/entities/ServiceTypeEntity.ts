import { EmployeeEntity } from "./EmployeeEntity";

export type ServiceTypeEntity = {
  id: string;
  name: string;
  commissionPercent: number;
  employess: EmployeeEntity[];
  createdAt: Date;
  updatedAt: Date;
};
