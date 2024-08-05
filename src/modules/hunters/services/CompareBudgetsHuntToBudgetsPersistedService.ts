import { IBudgetsRepository } from "src/modules/budgets/repositories/interfaces/IBudgetsRepository";
import { BudgetHuntedDTO } from "../dtos/BudgetHuntedDTO";

export class CompareBudgetsHuntToBudgetsPersistedService {
  constructor(private budgetRepository: IBudgetsRepository) {}

  async execute(huntBudget: BudgetHuntedDTO[]): Promise<BudgetHuntedDTO[]> {
    const budgetsHunted = await this.budgetRepository.listMany();
    const budgetsShortIds = budgetsHunted.map((budget) => budget.shortId);

    const budgetsToHunt = huntBudget.filter(
      (budgetHunt) => !budgetsShortIds.includes(Number(budgetHunt.NroOrc)),
    );

    return budgetsToHunt;
  }
}
