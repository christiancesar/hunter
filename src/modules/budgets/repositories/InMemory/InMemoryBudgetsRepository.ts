import { CreateBudgetDTO } from "../../dtos/CreateBudgetDTO";
import { BudgetEntity } from "../../entities/BudgetEntity";
import {
  BudgetsFindMany,
  IBudgetsRepository,
} from "../interfaces/IBudgetsRepository";

export class InMemoryBudgetsRepository implements IBudgetsRepository {
  private budgets: BudgetEntity[] = [];
  async create(budget: CreateBudgetDTO): Promise<BudgetEntity> {
    const newBudget = this.budgets.push({
      id: crypto.randomUUID(),
      ...budget,
      billedAt: new Date(budget.billedAt),
      soldAt: new Date(budget.soldAt),
      registeredAt: new Date(budget.registeredAt),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.budgets[newBudget - 1];
  }

  findById(id: string): Promise<BudgetEntity | null> {
    throw new Error("Method not implemented.");
  }

  findByShortIdAndLicense(
    shortId: number,
    license: number,
  ): Promise<BudgetEntity | null> {
    throw new Error("Method not implemented.");
  }

  listAllBudgetsPerPage(page: number): Promise<BudgetsFindMany> {
    throw new Error("Method not implemented.");
  }

  async listMany(): Promise<Omit<BudgetEntity, "customer" | "items">[]> {
    return this.budgets;
  }
}
