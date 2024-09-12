import BudgetsRepository from "src/modules/budgets/repositories/prisma/BudgetsRepository";
import { CompareBudgetsHuntToBudgetsPersistedService } from "../services/CompareBudgetsHuntToBudgetsPersistedService";

export class CompareBudgetsHuntToBudgetsPersistedServiceFactory {
  static make() {
    return new CompareBudgetsHuntToBudgetsPersistedService(
      new BudgetsRepository(),
    );
  }
}
