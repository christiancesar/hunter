import { CreateHunterDTO } from "../../dtos/CreateHunterDTO";
import { UpdateHunterDTO } from "../../dtos/UpdateHunterDTO";
import { HunterEntity } from "../../entities/HunterEntity";

export interface IHuntersRepository {
  create(hunt: CreateHunterDTO): Promise<HunterEntity>;
  save(hunt: UpdateHunterDTO): Promise<HunterEntity>;
  findBudgetHuntedOnId(huntedJobId: string): Promise<any | undefined>;

  listAll(): Promise<HunterEntity[]>;
  findById(id: string): Promise<HunterEntity | undefined>;
}
