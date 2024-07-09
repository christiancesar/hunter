import { StatusProgressDTO } from "../dtos/StatusProgressDTO";

export type HunterEntity = {
  id: string;
  statusProgressHunting: StatusProgressDTO;
  statusProgressNormalized: StatusProgressDTO;
  budgetsHunted: any;
  budgetsNormalized: any;
  errors: any;
  createdAt: Date;
  updatedAt: Date;
  finishedAt?: Date | null;
};
