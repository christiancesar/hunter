import { prisma } from "@shared/database/prisma";
import { CreateHunterDTO } from "../../dtos/CreateHunterDTO";
import { UpdateHunterDTO } from "../../dtos/UpdateHunterDTO";
import { HunterEntity } from "../../entities/HunterEntity";
import { IHuntersRepository } from "../interfaces/IHuntersRepository";
import HunterMapper from "../mappers/HunterMapper";

export default class HuntersRepository implements IHuntersRepository {
  async findBudgetHuntedOnId(huntedJobId: string): Promise<any | undefined> {
    const hunterJob = await prisma.hunter.findFirst({
      where: {
        id: huntedJobId,
      },
      select: {
        budgetsHunted: true,
      },
    });

    return hunterJob?.budgetsHunted;
  }
  async create({
    credentials,
    filter,
  }: CreateHunterDTO): Promise<HunterEntity> {
    const hunter = await prisma.hunter.create({
      data: {
        credential: {
          license: credentials.license,
          password: credentials.password,
          user: credentials.user,
        },
        filter: {
          budgetId: filter.budgetId,
          budgetStatus: filter.budgetStatus,
          finalDate: filter.finalDate,
          huntPagesQuantity: filter.huntPagesQuantity,
          initialDate: filter.initialDate,
        },
      },
    });

    return HunterMapper.toDomain(hunter);
  }

  async save({
    id,
    budgetsHunted,
    errors,
    statusProgressNormalized,
    statusProgressHunting,
    budgetsNormalized,
    finishedAt,
  }: UpdateHunterDTO): Promise<HunterEntity> {
    const hunter = await prisma.hunter.update({
      where: {
        id,
      },
      data: {
        budgetsHunted,
        errors,
        statusProgressNormalized,
        statusProgressHunting,
        budgetsNormalized,
        finishedAt,
      },
    });

    return HunterMapper.toDomain(hunter);
  }

  async listAll(): Promise<HunterEntity[]> {
    const hunters = await prisma.hunter.findMany();

    return hunters.map(HunterMapper.toDomain);
  }

  async findById(id: string): Promise<HunterEntity | undefined> {
    const hunter = await prisma.hunter.findFirst({
      where: {
        id,
      },
    });

    return hunter ? HunterMapper.toDomain(hunter) : undefined;
  }
}
