import { prisma } from "@shared/database/prisma";
import { BudgetLooseItemEntity } from "../../entities/BudgetLooseItemEntity";
import {
  CreateBudgetLooseItemDTO,
  IBudgetLooseItemsRepository,
} from "../interfaces/IBudgetLooseItemsRepository";

export default class BudgetLooseItemsRepository
  implements IBudgetLooseItemsRepository
{
  async create({
    code,
    internal_code,
    description,
    color,
    width,
    height,
    quantity,
    unitAmount,
    grossAmount,
    discountAmount,
    discountPercent,
    netAmount,
    measurement,
  }: CreateBudgetLooseItemDTO): Promise<BudgetLooseItemEntity> {
    const budgetLooseItem = await prisma.budgetLooseItem.create({
      data: {
        code,
        internal_code,
        description,
        color,
        width,
        height,
        quantity,
        unitAmount,
        discountAmount,
        discountPercent,
        netAmount,
        grossAmount,
        measurement,
      },
    });

    return budgetLooseItem;
  }
}
