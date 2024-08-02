import { CreateBudgetDTO } from "../../dtos/CreateBudgetDTO";
import { BudgetEntity } from "../../entities/BudgetEntity";

export type BudgetsFindMany = {
  budgets: BudgetEntity[];
  currentPage: number;
  pagelimit: number;
  records: number;
};

export interface IBudgetsRepository {
  create(budget: CreateBudgetDTO): Promise<BudgetEntity>;
  findById(id: string): Promise<BudgetEntity | null>;
  findByShortIdAndLicense(
    shortId: number,
    license: number,
  ): Promise<BudgetEntity | null>;
  findAll(page: number): Promise<BudgetsFindMany>;
}
