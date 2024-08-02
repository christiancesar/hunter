import { BudgetEntity } from "../entities/BudgetEntity";
import { IBudgetsRepository } from "../repositories/interfaces/IBudgetsRepository";

export default class ListAllBudgetsService {
  constructor(private budgetsRepository: IBudgetsRepository) {
    this.budgetsRepository = budgetsRepository;
  }

  async execute(page: number): Promise<any> {
    const budgets = await this.budgetsRepository.findAll(page);
    return budgets;
  }
}
