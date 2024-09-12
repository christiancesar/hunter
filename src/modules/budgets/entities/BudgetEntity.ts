import { BudgetItemEntity } from "./BudgetItemEntity";
import { CustomerEntity } from "./CustomerEntity";

export interface BudgetEntity {
  id: string;
  shortId: number;
  license: number;
  customer?: CustomerEntity;
  items?: BudgetItemEntity[];
  billedAt: Date;
  soldAt: Date;
  registeredAt: Date;
  grossAmount: number; //valorbruto
  itemsCount: number; //vendaitens
  discountAmount: number; //valordesconto
  netAmount: number; //valorliquido
  discountPercent: number; //percentualdesconto
  statusBudget: string;
  statusProducer: string;
  salesman: string;

  createdAt: Date;
  updatedAt: Date;
}
