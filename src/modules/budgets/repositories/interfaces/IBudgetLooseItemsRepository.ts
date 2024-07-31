import { BudgetLooseItemEntity } from "../../entities/BudgetLooseItemEntity";

export type CreateBudgetLooseItemDTO = {
  code: string;
  internal_code: string;
  description: string;
  color: string;
  width: number;
  height: number;
  quantity: number;
  unitAmount: number;
  grossAmount: number;
  netAmount: number;
  discountAmount: number;
  discountPercent: number;
  measurement: string;
};

export interface IBudgetLooseItemsRepository {
  create(
    budgetLooseItem: CreateBudgetLooseItemDTO,
  ): Promise<BudgetLooseItemEntity>;
}
