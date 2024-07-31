import { BudgetDTO } from "src/modules/budgets/dtos/BudgetDTO";
import { BudgetHuntedDTO } from "./BudgetHuntedDTO";
import { StatusProgressDTO } from "./StatusProgressDTO";

export type UpdateHunterDTO = {
  id: string;
  budgetsHunted?: BudgetHuntedDTO[];
  budgetsNormalized?: BudgetDTO[];
  errors?: any[];
  statusProgressNormalized?: StatusProgressDTO;
  statusProgressHunting?: StatusProgressDTO;
  finishedAt?: Date;
};
