import { prisma } from "src/shared/database/prisma";
import { CreateBudgetDTO } from "../../dtos/CreateBudgetDTO";
import { BudgetEntity } from "../../entities/BudgetEntity";
import {
  BudgetsFindMany,
  IBudgetsRepository,
} from "../interfaces/IBudgetsRepository";

export default class BudgetsRepository implements IBudgetsRepository {
  async create(budget: CreateBudgetDTO): Promise<BudgetEntity> {
    const budgets = await prisma.budget.create({
      data: {
        shortId: budget.shortId,
        license: budget.license,
        customer: {
          connect: {
            id: budget.customerId,
          },
        },
        items: {
          connect: budget.itemsIds.map((item) => ({
            id: item,
          })),
        },
        billedAt: new Date(budget.billedAt!),
        soldAt: new Date(budget.soldAt!),
        registeredAt: new Date(budget.registeredAt!),
        grossAmount: budget.grossAmount,
        itemsCount: budget.itemsCount,
        discountAmount: budget.discountAmount,
        netAmount: budget.netAmount,
        discountPercent: budget.discountPercent,
        statusBudget: budget.statusBudget,
        statusProducer: budget.statusProducer,
        salesman: budget.salesman,
      },
      include: {
        customer: {
          include: {
            address: true,
          },
        },
        items: true,
      },
    });

    return budgets;
  }

  async findById(id: string): Promise<BudgetEntity | null> {
    const budget = await prisma.budget.findUnique({
      where: {
        id: id,
      },
      include: {
        customer: {
          include: {
            address: true,
          },
        },
        items: true,
      },
    });

    return budget;
  }

  async findByShortIdAndLicense(
    shortId: number,
    license: number,
  ): Promise<BudgetEntity | null> {
    const budget = await prisma.budget.findUnique({
      where: {
        shortId_license: {
          shortId,
          license,
        },
      },
      include: {
        customer: {
          include: {
            address: true,
          },
        },
        items: true,
      },
    });

    return budget;
  }

  async listAllBudgetsPerPage(page: number): Promise<BudgetsFindMany> {
    const count = await prisma.budget.count();
    const pagelimit = Math.ceil(count / 20);
    const currentPage = page > pagelimit ? pagelimit : page;

    const budgets = await prisma.budget.findMany({
      include: {
        customer: {
          include: {
            address: true,
          },
        },
        items: true,
      },
      take: 20,
      skip: (currentPage - 1) * 20,
    });

    return { budgets, currentPage, pagelimit, records: 20 };
  }

  async listMany(): Promise<Omit<BudgetEntity, "customer" | "items">[]> {
    return prisma.budget.findMany();
  }
}
