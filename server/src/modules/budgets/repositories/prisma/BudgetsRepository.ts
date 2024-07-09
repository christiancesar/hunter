import { prisma } from "src/shared/database/prisma";
import { CreateBudgetDTO } from "../../dtos/CreateBudgetDTO";
import { BudgetEntity } from "../../entities/BudgetEntity";
import { IBudgetsRepository } from "../interfaces/IBudgetsRepository";

export default class BudgetsRepository implements IBudgetsRepository {
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
  async findAll(): Promise<BudgetEntity[]> {
    const budgets = await prisma.budget.findMany({
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
          connect: budget.itemsIds.map((id) => {
            return { id };
          }),
        },
        // looseItems: {
        //   connect: budget.looseItemsIds.map((id) => {
        //     return { id };
        //   }),
        // },
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
}
