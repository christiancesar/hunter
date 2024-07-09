import { prisma } from "@shared/database/prisma";
import { ServiceTypeCommissionEntity } from "../../entities/ServiceTypeCommissionEntity";
import { ICreateServiceTypeCommissionDTO } from "../../dtos/ICreateServiceTypeCommissionDTO";
import { IUpdateServiceTypeCommissionDTO } from "../../dtos/IUpdateServiceTypeCommissionDTO";
import { IServiceTypesCommissionRepository } from "../IServiceTypesCommissionRepository";

export default class ServiceTypeCommissionRepository
  implements IServiceTypesCommissionRepository
{
  async listAll(): Promise<ServiceTypeCommissionEntity[]> {
    const serviceTypeCommissions =
      await prisma.serviceTypeCommission.findMany();
    return serviceTypeCommissions;
  }
  async findById(id: string): Promise<ServiceTypeCommissionEntity | null> {
    const serviceTypeCommission = await prisma.serviceTypeCommission.findFirst({
      where: {
        id,
      },
    });
    return serviceTypeCommission;
  }
  async findByName(name: string): Promise<ServiceTypeCommissionEntity | null> {
    const serviceTypeCommission = await prisma.serviceTypeCommission.findFirst({
      where: {
        name,
      },
    });
    return serviceTypeCommission;
  }
  async create({
    name,
  }: ICreateServiceTypeCommissionDTO): Promise<ServiceTypeCommissionEntity> {
    const serviceTypeCommission = await prisma.serviceTypeCommission.create({
      data: {
        name,
      },
    });

    return serviceTypeCommission;
  }
  async update({
    id,
    name,
  }: IUpdateServiceTypeCommissionDTO): Promise<ServiceTypeCommissionEntity> {
    const serviceTypeCommission = await prisma.serviceTypeCommission.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return serviceTypeCommission;
  }
  async delete(id: string): Promise<void> {
    await prisma.serviceTypeCommission.delete({
      where: {
        id,
      },
    });
  }
}
