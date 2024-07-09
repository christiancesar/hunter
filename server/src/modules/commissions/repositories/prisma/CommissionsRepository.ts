import { prisma } from "@shared/database/prisma";
import { ICreateCommissionDTO } from "../../dtos/ICreateCommissionDTO";
import { IUpdateCommissionDTO } from "../../dtos/IUpdateCommissionDTO";
import { ServiceTypeCommissionEntity } from "../../entities/ServiceTypeCommissionEntity";
import {
  FindCommissionByPeriodParams,
  ICommissionsRepository,
} from "../ICommissionsRepository";

type SharedWithEmployees = {
  id: string;
  name: string;
};
export type EmployeeCommissionDTO = {
  id: string;
  name: string;
  serviceTypes: {
    id: string;
    name: string;
    commissionPercent: number;
  }[];
  commissions: {
    id: string;
    budget?: {
      id: string;
      shortId: number;
      customerName: string;
    };
    budgetItem?: {
      id: string;
      description: string;
    };
    budgetItemQuantity: number;
    budgetItemAmount: number;
    commissionPercent: number;
    commissionAmount: number;
    divisionBy: number;
    sharedWithEmployees: SharedWithEmployees[];
    serviceTypeCommission: {
      id: string;
      name: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type CommissionDTO = {
  id: string;
  employees: {
    id: string;
    name: string;
  }[];
  serviceTypeCommission: {
    id: string;
    name: string;
  };
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

export default class CommissionsRepository implements ICommissionsRepository {
  async create({
    budgetShortId,
    budgetId,
    budgetItemId,
    budgetItemQuantity,
    budgetItemAmount,
    commissionPercent,
    divisionBy,
    commissionAmount,
    employeeIds,
    serviceTypeCommissionId,
  }: ICreateCommissionDTO): Promise<CommissionDTO> {
    const comission = await prisma.commission.create({
      data: {
        budgetShortId,
        budgetId,
        budgetItemId,
        budgetItemQuantity,
        budgetItemAmount,
        commissionPercent,
        divisionBy,
        commissionAmount,
        employeeIds,
        employees: {
          connect: employeeIds.map((employeeId) => ({
            id: employeeId,
          })),
        },
        serviceTypeCommissionId,
      },
      include: {
        serviceTypeCommission: true,
        employees: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return comission;
  }

  async update({
    id,
    employeeIds,
    budgetShortId,
    budgetId,
    budgetItemId,
    budgetItemQuantity,
    budgetItemAmount,
    commissionPercent,
    divisionBy,
    commissionAmount,
    serviceTypeCommissionId,
  }: IUpdateCommissionDTO): Promise<CommissionDTO> {
    const comission = await prisma.commission.update({
      where: {
        id,
      },
      data: {
        budgetShortId,
        budgetId,
        budgetItemId,
        budgetItemQuantity,
        budgetItemAmount,
        commissionPercent,
        divisionBy,
        commissionAmount,
        employeeIds,
        serviceTypeCommissionId,
      },
      include: {
        employees: {
          select: {
            id: true,
            name: true,
          },
        },
        serviceTypeCommission: true,
      },
    });
    return comission;
  }

  async findById(id: string): Promise<CommissionDTO | null> {
    const comission = await prisma.commission.findUnique({
      where: {
        id,
      },
      include: {
        employees: {
          select: {
            id: true,
            name: true,
          },
        },
        serviceTypeCommission: true,
      },
    });
    return comission;
  }

  async findByBudgetItemId(budgetItemId: string): Promise<CommissionDTO[]> {
    const comission = await prisma.commission.findMany({
      where: {
        budgetItemId,
      },
      include: {
        employees: {
          select: {
            id: true,
            name: true,
          },
        },
        serviceTypeCommission: true,
      },
    });
    return comission;
  }
  async findByEmployeeId(employeeId: string): Promise<CommissionDTO[]> {
    const comission = await prisma.commission.findMany({
      where: {
        employeeIds: {
          equals: [employeeId],
        },
      },
      include: {
        employees: {
          select: {
            id: true,
            name: true,
          },
        },
        serviceTypeCommission: true,
      },
    });

    return comission;
  }

  async findAll(): Promise<CommissionDTO[]> {
    const comission = await prisma.commission.findMany({
      include: {
        employees: {
          select: {
            id: true,
            name: true,
          },
        },
        serviceTypeCommission: true,
      },
    });
    return comission;
  }

  async findCommissionByPeriod({
    startDate,
    endDate,
    employeeId,
  }: FindCommissionByPeriodParams): Promise<CommissionDTO[]> {
    return prisma.commission.findMany({
      where: {
        employeeIds: {
          has: employeeId,
        },
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        employees: {
          select: {
            id: true,
            name: true,
          },
        },
        serviceTypeCommission: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.commission.delete({
      where: {
        id,
      },
    });
  }

  async allCommissionsByEmployees(): Promise<EmployeeCommissionDTO[]> {
    const employee = await prisma.employee.findMany({
      include: {
        serviceTypes: true,
        commissions: {
          include: {
            serviceTypeCommission: true,
            employees: true,
          },
        },
      },
    });

    const employeescommissions = await Promise.all(
      employee.map(async (employee) => {
        const commissions = await Promise.all(
          employee.commissions.map(async (commission) => {
            const budget = await prisma.budget.findUnique({
              where: {
                id: commission.budgetId,
              },
              select: {
                id: true,
                shortId: true,
                customer: {
                  select: {
                    name: true,
                  },
                },
              },
            });

            const budgetItem = await prisma.budgetItem.findUnique({
              where: {
                id: commission.budgetItemId,
              },
              select: {
                id: true,
                description: true,
              },
            });

            const sharedWithEmployeeIdsExist = commission.employeeIds.filter(
              (employeeId) => {
                if (employee.id != employeeId) return employeeId;
              },
            );

            let sharedWithEmployees: SharedWithEmployees[] = [];

            if (sharedWithEmployeeIdsExist) {
              sharedWithEmployees = sharedWithEmployeeIdsExist.map(
                (employeeId) => {
                  const sharedWithEmployee = commission.employees.find(
                    (employee) => employee.id === employeeId,
                  );
                  return {
                    id: sharedWithEmployee!.id,
                    name: sharedWithEmployee!.name,
                  };
                },
              );
            }

            return {
              id: commission.id,
              budget: {
                id: budget!.id,
                shortId: budget!.shortId,
                customerName: budget!.customer.name,
              },
              budgetItem: budgetItem!,
              budgetItemQuantity: commission.budgetItemQuantity,
              budgetItemAmount: commission.budgetItemAmount,
              commissionPercent: commission.commissionPercent,
              commissionAmount: commission.commissionAmount,
              divisionBy: commission.divisionBy,
              sharedWithEmployees,
              serviceTypeCommission: {
                id: commission.serviceTypeCommission.id,
                name: commission.serviceTypeCommission.name,
              },
              createdAt: commission.createdAt,
              updatedAt: commission.updatedAt,
            };
          }),
        );

        return {
          id: employee.id,
          name: employee.name,
          commissions,
          serviceTypes: employee.serviceTypes.map((serviceType) => ({
            id: serviceType.id,
            name: serviceType.name,
            commissionPercent: serviceType.commissionPercent,
          })),
        };
      }),
    );

    return employeescommissions;
  }
}
