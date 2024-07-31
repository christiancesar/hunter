export interface BudgetItemEntity {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
}
