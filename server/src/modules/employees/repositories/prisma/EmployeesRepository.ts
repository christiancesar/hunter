import { prisma } from "@shared/database/prisma";
import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";
import { IEmployeesRepository } from "../IEmployeesRepository";
import { IUpdateEmployeeDTO } from "../../dtos/IUpdateEmployeeDTO";
import EmployeeMapper, { EmployeeDTO } from "../../mappers/EmployeeMapper";

export default class EmployeesRepository implements IEmployeesRepository {
  async create({ name }: ICreateEmployeeDTO): Promise<EmployeeDTO> {
    const employeePrisma = await prisma.employee.create({
      data: {
        name,
      },
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

    const employee = EmployeeMapper.toDomain(employeePrisma);

    return employee;
  }

  async save({
    id,
    name,
    serviceTypeIds,
  }: IUpdateEmployeeDTO): Promise<EmployeeDTO> {
    const employeeUpdated = await prisma.employee.update({
      where: {
        id,
      },
      data: {
        name,
        serviceTypes: {
          connect: serviceTypeIds?.map((id) => ({ id })),
        },
      },
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

    const employee = EmployeeMapper.toDomain(employeeUpdated);

    return employee;
  }
  async listall(): Promise<EmployeeDTO[]> {
    const employeesPrisma = await prisma.employee.findMany({
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

    const employees = employeesPrisma.map((employee) =>
      EmployeeMapper.toDomain(employee),
    );
    return employees;
  }

  async findById(id: string): Promise<EmployeeDTO | null> {
    const employeePrisma = await prisma.employee.findUnique({
      where: {
        id,
      },
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
    const employee = employeePrisma
      ? EmployeeMapper.toDomain(employeePrisma)
      : null;
    return employee;
  }

  async findByEmployeeName(name: string): Promise<EmployeeDTO | null> {
    const employeePrisma = await prisma.employee.findFirst({
      where: {
        name,
      },
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
    const employee = employeePrisma
      ? EmployeeMapper.toDomain(employeePrisma)
      : null;

    return employee;
  }

  async deleteAll(): Promise<void> {
    await prisma.employee.deleteMany({});
  }
}
