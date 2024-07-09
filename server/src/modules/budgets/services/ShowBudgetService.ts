import { AppError } from "@shared/errors/AppError";
import { BudgetEntity } from "../entities/BudgetEntity";
import { IBudgetsRepository } from "../repositories/interfaces/IBudgetsRepository";

export default class ShowBudgetService {
  constructor(private budgetsRepository: IBudgetsRepository) {
    this.budgetsRepository = budgetsRepository;
  }

  async execute(id: string): Promise<BudgetEntity> {
    const budget = await this.budgetsRepository.findById(id);
    if (!budget) {
      throw new AppError("Budget not found");
    }

    return budget;
  }
}
