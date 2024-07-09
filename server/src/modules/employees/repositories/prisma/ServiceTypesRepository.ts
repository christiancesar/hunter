import { prisma } from "@shared/database/prisma";
import { ICreateServiceTypeDTO } from "../../dtos/ICreateServiceTypeDTO";
import { IUpdateServiceTypeDTO } from "../../dtos/IUpdateServiceTypeDTO";
import { ServiceTypeEntity } from "../../entities/ServiceTypeEntity";
import { IServiceTypesRepository } from "../IServiceTypesRepository";

export default class ServiceTypesRepository implements IServiceTypesRepository {
  async deleteAllRecordsSeed(): Promise<void> {
    await prisma.serviceType.deleteMany();
  }

  async findByName(name: string): Promise<ServiceTypeEntity | null> {
    const serviceType = await prisma.serviceType.findFirst({
      where: {
        name,
      },
    });

    return serviceType;
  }

  async listAll(): Promise<ServiceTypeEntity[]> {
    const serviceTypes = await prisma.serviceType.findMany();
    return serviceTypes;
  }

  async findById(id: string): Promise<ServiceTypeEntity | null> {
    const serviceType = await prisma.serviceType.findUnique({
      where: {
        id,
      },
      include: {
        employee: true,
      },
    });
    return serviceType;
  }
  async create(data: ICreateServiceTypeDTO): Promise<ServiceTypeEntity> {
    const serviceType = await prisma.serviceType.create({
      data: {
        name: data.name,
        commissionPercent: data.commissionPercent,
      },
    });

    return serviceType;
  }
  async save(serviceType: IUpdateServiceTypeDTO): Promise<ServiceTypeEntity> {
    const serviceTypeUpdated = await prisma.serviceType.update({
      where: {
        id: serviceType.id,
      },
      data: {
        name: serviceType.name,
        commissionPercent: serviceType.commissionPercent,
      },
      include: {
        employee: true,
      },
    });
    return serviceTypeUpdated;
  }
}
