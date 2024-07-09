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
export interface IBudgetItemsRepository {
  create(budgetItem: CreateBudgetItemDTO): Promise<BudgetItemEntity>;
  findById(id: string): Promise<BudgetItemEntity | null>;
  findByBudgetShortId(budgetShortId: number): Promise<BudgetItemEntity | null>;
  // findByBudgetShortIdAndOrder(budgetShortId: number, order: number): Promise<BudgetItemEntity | undefined>;
  // update(budgetItem: BudgetItemEntity): Promise<BudgetItemEntity>;
  // delete(id: string): Promise<void>;
  // deleteByBudgetShortId(budgetShortId: number): Promise<void>;
  // deleteByBudgetShortIdAndOrder(budgetShortId: number, order: number): Promise<void>;
}
