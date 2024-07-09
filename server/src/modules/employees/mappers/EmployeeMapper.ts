import {
  Employee,
  ServiceType,
  Commission as CommissionPrisma,
  ServiceTypeCommission,
} from "@prisma/client";

type Commission = CommissionPrisma & {
  employees: Employee[];
  serviceTypeCommission: ServiceTypeCommission;
};
type EmployeeMapperParams = {
  id: string;
  name: string;
  comissionIds: string[];
  serviceTypeIds: string[];
  serviceTypes: ServiceType[];
  commissions: Commission[];
  createdAt: Date;
  updatedAt: Date;
};

type SharedWithEmployees = {
  id: string;
  name: string;
};
export type EmployeeDTO = {
  id: string;
  name: string;
  serviceTypes: {
    id: string;
    name: string;
    commissionPercent: number;
  }[];
  commissions: {
    id: string;
    commissionPercent: number;
    budgetShortId: number;
    budgetId: string;
    budgetItemId: string;
    budgetItemQuantity: number;
    budgetItemAmount: number;
    divisionBy: number;
    commissionAmount: number;
    sharedWithEmployees: SharedWithEmployees[];
    serviceTypeCommission: {
      id: string;
      name: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }[];
};

class EmployeeMapper {
  toDomain(employee: EmployeeMapperParams): EmployeeDTO {
    const serviceTypes = employee.serviceTypes.map((serviceType) => ({
      id: serviceType.id,
      name: serviceType.name,
      commissionPercent: serviceType.commissionPercent,
    }));

    const commissions = employee.commissions.map((commission) => {
      const sharedWithEmployeeIdsExist = commission.employeeIds.filter(
        (employeeId) => {
          if (employee.id != employeeId) return employeeId;
        },
      );

      let sharedWithEmployees: SharedWithEmployees[] = [];

      if (sharedWithEmployeeIdsExist) {
        sharedWithEmployees = sharedWithEmployeeIdsExist.map((employeeId) => {
          const sharedWithEmployee = commission.employees.find(
            (employee) => employee.id === employeeId,
          );
          return {
            id: sharedWithEmployee!.id,
            name: sharedWithEmployee!.name,
          };
        });
      }

      return {
        id: commission.id,
        commissionPercent: commission.commissionPercent,
        budgetShortId: commission.budgetShortId,
        budgetId: commission.budgetId,
        budgetItemId: commission.budgetItemId,
        budgetItemQuantity: commission.budgetItemQuantity,
        budgetItemAmount: commission.budgetItemAmount,
        divisionBy: commission.divisionBy,
        commissionAmount: commission.commissionAmount,
        sharedWithEmployees,
        serviceTypeCommission: {
          id: commission.serviceTypeCommission.id,
          name: commission.serviceTypeCommission.name,
        },
        createdAt: commission.createdAt,
        updatedAt: commission.updatedAt,
      };
    });

    return {
      id: employee.id,
      name: employee.name,
      serviceTypes,
      commissions,
    };
  }
}

export default new EmployeeMapper();
