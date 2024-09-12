import { CreateBudgetDTO } from "../../dtos/CreateBudgetDTO";

type CreateBydgetFactoryParams = {
  shortId?: number;
  customerId?: string;
  itemsIds?: string[];
  license?: number;
  billedAt?: Date | string;
  soldAt?: Date | string;
  registeredAt?: Date | string;
  grossAmount?: number;
  itemsCount?: number;
  netAmount?: number;
  discountAmount?: number; //valordesconto
  discountPercent?: number; //percentualdesconto
  statusBudget?: string;
  statusProducer?: string;
  salesman?: string;
};

export class CreateBudgetFactory {
  static make(budget?: CreateBydgetFactoryParams): CreateBudgetDTO {
    return {
      shortId: budget?.shortId ?? 1,
      billedAt: budget?.billedAt ?? new Date(),
      registeredAt: budget?.registeredAt ?? new Date(),
      soldAt: budget?.soldAt ?? new Date(),
      customerId: budget?.customerId ?? "1",
      discountAmount: budget?.discountAmount ?? Math.random() + 1,
      discountPercent: budget?.discountPercent ?? Math.random() + 1,
      grossAmount: budget?.grossAmount ?? Math.random() + 1,
      itemsCount: budget?.itemsCount ?? Math.random() + 1,
      license: budget?.license ?? Math.random() + 1,
      netAmount: budget?.netAmount ?? Math.random() + 1,
      salesman: budget?.salesman ?? "John Doe",
      statusBudget: budget?.statusBudget ?? "",
      statusProducer: budget?.statusProducer ?? "",
      itemsIds: budget?.itemsIds ?? [],
    };
  }
}
