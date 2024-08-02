import { BudgetItemsDTO } from "./BudgetItemsDTO";

export type BudgetDTO = {
  shortId: number;
  license: number;
  customer: {
    name: string;
    phones: string[];
    email: string;
    address: {
      street: string;
      number: number;
      neighborhood: string;
      city: string;
      state: string;
    };
  };
  items: BudgetItemsDTO[];
  // looseItems: LooseItemDTO[];
  billedAt: Date;
  soldAt: Date;
  registeredAt: Date;
  grossAmount: number; //valorbruto
  itemsCount: number; //vendaitens
  netAmount: number; //valorliquido
  discountAmount: number; //valordesconto
  discountPercent: number; //percentualdesconto
  statusBudget: string;
  statusProducer: string;
  salesman: string;
};
