export interface IUpdateCommissionDTO {
  id: string;
  employeeIds: string[];
  budgetShortId: number;
  budgetId: string;
  budgetItemId: string;
  budgetItemQuantity: number;
  budgetItemAmount: number;
  commissionPercent: number;
  divisionBy: number;
  commissionAmount: number;
  serviceTypeCommissionId: string;
}
