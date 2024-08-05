import { beforeEach, describe, expect, it } from "vitest";
import CreateJobHuntService from "./CreateJobHuntService";
import { HuntersInMemoryRepository } from "../repositories/inMemory/HuntersInMemoryRepository";
import { IBudgetsRepository } from "src/modules/budgets/repositories/interfaces/IBudgetsRepository";
import { CompareBudgetsHuntToBudgetsPersistedService } from "./CompareBudgetsHuntToBudgetsPersistedService";
import { InMemoryBudgetsRepository } from "src/modules/budgets/repositories/InMemory/InMemoryBudgetsRepository";
import { CreateBudgetFactory } from "src/modules/budgets/repositories/factories/CreateBudgetFactory";
import { CreateBudgetHuntedFactory } from "../factories/CreateBudgetHuntedFactory";
import { BudgetHuntedDTO } from "../dtos/BudgetHuntedDTO";

let budgetRepository: IBudgetsRepository;
let sut: CompareBudgetsHuntToBudgetsPersistedService;

describe("Compare hunt budget with budget persisted", () => {
  beforeEach(() => {
    budgetRepository = new InMemoryBudgetsRepository();
    sut = new CompareBudgetsHuntToBudgetsPersistedService(budgetRepository);
  });

  it("should be able return only budgets difference persisted", async () => {
    await budgetRepository.create(
      CreateBudgetFactory.make({
        shortId: 1,
      }),
    );
    await budgetRepository.create(
      CreateBudgetFactory.make({
        shortId: 2,
      }),
    );

    await budgetRepository.create(
      CreateBudgetFactory.make({
        shortId: 3,
      }),
    );

    const budgetHunted: BudgetHuntedDTO[] = [];

    budgetHunted.push(
      CreateBudgetHuntedFactory.make({
        NroOrc: "3",
      }),
      CreateBudgetHuntedFactory.make({
        NroOrc: "4",
      }),
      CreateBudgetHuntedFactory.make({
        NroOrc: "5",
      }),
    );

    const budgetNotPersisted = await sut.execute(budgetHunted);

    expect(budgetNotPersisted).toHaveLength(2);
  });
});
