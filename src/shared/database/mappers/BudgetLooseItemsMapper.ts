import { amountStringToNumber } from "@shared/helpers/amountStringToNumber";
import { BudgetItemsDTO } from "src/modules/budgets/dtos/BudgetItemsDTO";
import { LooseItemHuntedDTO } from "src/modules/hunters/dtos/LooseItemHuntedDTO";
type DomainParams = {
  looseItem: LooseItemHuntedDTO;
  budget: {
    discountPercent: number;
    order: number;
    license: number;
    budgetShortId: number;
  };
};
class BudgetLooseItemsMapper {
  toDomain({
    budget: { discountPercent, order, license, budgetShortId },
    looseItem,
  }: DomainParams): BudgetItemsDTO {
    const quantity = amountStringToNumber({
      amount: looseItem.QTDE13,
      nameVariable: "QTDE13",
    });
    const unitAmount = amountStringToNumber({
      amount: looseItem.VLRUNT14,
      nameVariable: "VLRUNT14",
    });

    const grossAmount = amountStringToNumber({
      amount: looseItem.TOTAL15,
      nameVariable: "TOTAL15",
    });

    const discountAmount = grossAmount * (discountPercent / 100);

    const netAmount = grossAmount - discountAmount;

    return {
      budgetShortId,
      license,
      order,
      description: looseItem.void9,
      quantity,
      unitAmount,
      grossAmount,
      netAmount,
      discountAmount,
      discountPercent,
      width: Number(looseItem.LARGURA11),
      height: Number(looseItem.ALTURA12),
      originalGrossAmount: 0,
      originalUnitAmount: 0,
      modifiedGrossAmount: 0,
      modifiedUnitAmount: 0,
      glass: "",
      grossAmountIsModified: false,
    };
  }
}

export default new BudgetLooseItemsMapper();
