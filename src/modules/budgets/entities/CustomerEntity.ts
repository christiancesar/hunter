import { AddressEntity } from "./AddressEntity";
import { BudgetEntity } from "./BudgetEntity";

export interface CustomerEntity {
  id: string;
  name: string;
  phones: string[];
  email: string;
  address: AddressEntity;
  budgets?: BudgetEntity[];
  createdAt: Date;
  updatedAt: Date;
}
