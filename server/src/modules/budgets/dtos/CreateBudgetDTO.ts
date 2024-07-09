export type CreateBudgetDTO = {
  shortId: number;
  customerId: string;
  itemsIds: string[];
  // looseItemsIds: string[];
  license: number;
  billedAt: Date | string;
  soldAt: Date | string;
  registeredAt: Date | string;
  grossAmount: number;
  itemsCount: number;
  netAmount: number;
  discountAmount: number; //valordesconto
  discountPercent: number; //percentualdesconto
  statusBudget: string;
  statusProducer: string;
  salesman: string;
};
