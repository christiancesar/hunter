import { prisma } from "@shared/database/prisma";
import { BudgetItemEntity } from "../../entities/BudgetItemEntity";
import {
  CreateBudgetItemDTO,
  IBudgetItemsRepository,
} from "../interfaces/IBudgetItemsRepository";

export default class BudgetItemsRepository implements IBudgetItemsRepository {
  async create({
    order,
    budgetShortId,
    license,
    description,
    quantity,
    unitAmount,
    grossAmount,
    discountAmount,
    discountPercent,
    grossAmountIsModified,
    modifiedGrossAmount,
    modifiedUnitAmount,
    netAmount,
    originalGrossAmount,
    originalUnitAmount,
    width,
    height,
    glass,
  }: CreateBudgetItemDTO): Promise<BudgetItemEntity> {
    const items = prisma.budgetItem.create({
      data: {
        order,
        budgetShortId,
        license,
        description,
        quantity,
        unitAmount,
        grossAmount,
        discountAmount,
        discountPercent,
        grossAmountIsModified,
        modifiedGrossAmount,
        modifiedUnitAmount,
        netAmount,
        originalGrossAmount,
        originalUnitAmount,
        width,
        height,
        glass,
      },
    });

    return items;
  }
  async findById(id: string): Promise<BudgetItemEntity | null> {
    const budgetItem = await prisma.budgetItem.findUnique({
      where: {
        id,
      },
    });

    return budgetItem;
  }

  async findByBudgetShortId(
    budgetShortId: number,
  ): Promise<BudgetItemEntity | null> {
    const budgetItem = await prisma.budgetItem.findFirst({
      where: {
        budgetShortId: budgetShortId,
      },
    });

    return budgetItem;
  }
}
