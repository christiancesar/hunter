export interface BudgetLooseItemEntity {
  id: string;
  code: string;
  internal_code: string;
  description: string;
  color: string;
  width: number;
  height: number;
  quantity: number;
  unitAmount: number;
  grossAmount: number;
  measurement: string;
  createdAt: Date;
  updatedAt: Date;
}
