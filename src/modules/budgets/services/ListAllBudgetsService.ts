import { BudgetEntity } from "../entities/BudgetEntity";
import { IBudgetsRepository } from "../repositories/interfaces/IBudgetsRepository";

export default class ListAllBudgetsService {
  constructor(private budgetsRepository: IBudgetsRepository) {
    this.budgetsRepository = budgetsRepository;
  }

  async execute(): Promise<BudgetEntity[]> {
    const budgets = await this.budgetsRepository.findAll();
    return budgets;
  }
}
