import { BudgetItemEntity } from "../../entities/BudgetItemEntity";
export type CreateBudgetItemDTO = {
  order: number;
  budgetShortId: number;
  license: number;
  description: string;
  quantity: number;
  originalUnitAmount: number;
  originalGrossAmount: number;
  modifiedUnitAmount: number;
  modifiedGrossAmount: number;
  grossAmountIsModified: boolean;
  unitAmount: number;
  grossAmount: number;
  netAmount: number;
  discountAmount: number;
  discountPercent: number;
  width: number;
  height: number;
  glass: string;
};

export type BudgetItemsIds = {
  id: string;
};
export interface IBudgetItemsRepository {
  create(budgetItem: CreateBudgetItemDTO): Promise<BudgetItemEntity>;
  findById(id: string): Promise<BudgetItemEntity | null>;
  findByBudgetShortId(budgetShortId: number): Promise<BudgetItemEntity | null>;
  createMany(data: CreateBudgetItemDTO[]): Promise<BudgetItemsIds[]>;
}
