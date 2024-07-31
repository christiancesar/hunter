import { amountStringToNumber } from "@shared/helpers/amountStringToNumber";
import { BudgetItemsDTO } from "src/modules/budgets/dtos/BudgetItemsDTO";
import { BudgetItemHuntedDTO } from "src/modules/hunters/dtos/BudgetItemHuntedDTO";

class BudgetItemsHuntedMapper {
  toDomain(
    budgetItem: BudgetItemHuntedDTO,
    discountPercent: number,
  ): BudgetItemsDTO {
    const originalUnitAmount = amountStringToNumber({
      amount: budgetItem.VlrUnt9,
      nameVariable: "VlrUnt9",
    });

    const originalGrossAmount = amountStringToNumber({
      amount: budgetItem.VlrTotal10,
      nameVariable: "VlrTotal10",
    });

    const modifiedGrossAmount = amountStringToNumber({
      amount: budgetItem.VlrAlterado18,
      nameVariable: "VlrAlterado18",
    });

    const quantity = Number(budgetItem.Qtd8);

    const grossAmountIsModified = originalGrossAmount != modifiedGrossAmount;

    let grossAmount = originalGrossAmount;
    let unitAmount = originalUnitAmount;
    let discountAmount = originalGrossAmount * (discountPercent / 100);
    let netAmount = grossAmount - discountAmount;
    let modifiedUnitAmount = 0;

    if (grossAmountIsModified) {
      modifiedUnitAmount = modifiedGrossAmount / quantity;
      unitAmount = modifiedUnitAmount;
      grossAmount = modifiedGrossAmount;
      discountAmount = modifiedGrossAmount * (discountPercent / 100);
      netAmount = modifiedGrossAmount - discountAmount;
    }

    return {
      order: Number(budgetItem.Ord3),
      budgetShortId: Number(budgetItem.NroOramento20),
      license: Number(budgetItem.Licena22),
      description: budgetItem.Item26,
      quantity,
      originalUnitAmount,
      originalGrossAmount,
      modifiedUnitAmount,
      modifiedGrossAmount,
      grossAmountIsModified,
      unitAmount,
      grossAmount,
      netAmount,
      discountAmount,
      discountPercent,
      width: Number(budgetItem.Largura21),
      height: Number(budgetItem.Altura23),
      glass: budgetItem.Vidro16,
    };
  }
}

export default new BudgetItemsHuntedMapper();
