import { amountStringToNumber } from "@shared/helpers/amountStringToNumber";
import { dateStringToDate } from "@shared/helpers/dateStringToDate";
import { BudgetDTO } from "src/modules/budgets/dtos/BudgetDTO";
import { BudgetHuntedDTO } from "src/modules/hunters/dtos/BudgetHuntedDTO";
import BudgetItemsHunterMapper from "./BudgetItemsHuntedMapper";
import BudgetLooseItemsMapper from "./BudgetLooseItemsMapper";

export const statusBudget = {
  ORÇAMENTO: "budget",
  FATURADO: "billed",
  CANCELADO: "canceled",
  DEVOLVIDO: "returned",
  VENDA: "sold",
} as const;

export class BudgetHuntedMapper {
  static toDomain(budget: BudgetHuntedDTO): BudgetDTO {
    const phones = [budget.Fone, budget.Fone2, budget.Celular].filter(
      (phone) => {
        if (phone.trim() !== "") {
          return phone;
        }
      },
    );

    const discountPercent =
      (amountStringToNumber({
        amount: budget.valordesconto,
        nameVariable: "valordesconto",
      }) /
        amountStringToNumber({
          amount: budget.valorbruto,
          nameVariable: "valorbruto",
        })) *
      100;

    const items = budget.items?.map((item) => {
      return BudgetItemsHunterMapper.toDomain(item, discountPercent);
    });

    let order = 1;
    const looseItems = budget.looseItems?.map((looseItem) => {
      if (items.length > 0) {
        order = items[items.length - 1].order;
      }
      return BudgetLooseItemsMapper.toDomain({
        budget: {
          discountPercent,
          order: order++,
          license: Number(budget.Licena),
          budgetShortId: Number(budget.NroOrc),
        },
        looseItem,
      });
    });

    return {
      shortId: Number(budget.NroOrc),
      license: Number(budget.Licena),
      customer: {
        name: budget.NomeRazoCliente,
        phones,
        email: budget.Email,
        address: {
          street: budget.Endereco,
          number: Number(budget.NroCasa) ? Number(budget.NroCasa) : 0,
          neighborhood: budget.Bairro,
          city: budget.Cidade,
          state: budget.UF,
        },
      },
      items: [...items, ...looseItems],
      billedAt: dateStringToDate(budget.DtFaturado),
      soldAt: dateStringToDate(budget.DtVenda),
      registeredAt: dateStringToDate(budget.DtCadastro),
      netAmount: amountStringToNumber({
        amount: budget.Vlr,
        nameVariable: "Vlr",
      }),
      itemsCount:
        Number(budget.itenscesta) +
        looseItems
          .map((item) => item.quantity)
          .reduce((acc, curr) => acc + curr, 0),
      grossAmount: amountStringToNumber({
        amount: budget.valorbruto,
        nameVariable: "valorbruto",
      }),
      discountAmount: amountStringToNumber({
        amount: budget.valordesconto,
        nameVariable: "valordesconto",
      }),
      discountPercent,
      statusBudget: statusBudget[budget.Situao as keyof typeof statusBudget],
      statusProducer: budget.EstagioProduo,
      salesman: budget.Vendedor,
    };
  }
}
