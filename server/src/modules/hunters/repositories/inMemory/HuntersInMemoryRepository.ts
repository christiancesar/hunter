import { CreateHunterDTO } from "../../dtos/CreateHunterDTO";
import { StatusProgressDTO } from "../../dtos/StatusProgressDTO";
import { UpdateHunterDTO } from "../../dtos/UpdateHunterDTO";
import { HunterEntity } from "../../entities/HunterEntity";
import { IHuntersRepository } from "../interfaces/IHuntersRepository";

export class HuntersInMemoryRepository implements IHuntersRepository {
  public hunters: HunterEntity[] = [];

  async create({ credentials, filter }: CreateHunterDTO) {
    const hunter: HunterEntity = {
      id: crypto.randomUUID(),
      budgetsHunted: [],
      budgetsNormalized: [],
      errors: [],
      statusProgressHunting: StatusProgressDTO.CREATED,
      statusProgressNormalized: StatusProgressDTO.CREATED,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.hunters.push(hunter);
    return hunter;
  }
  save(hunt: UpdateHunterDTO): Promise<HunterEntity> {
    throw new Error("Method not implemented.");
  }
  findBudgetHuntedOnId(huntedJobId: string): Promise<any | undefined> {
    throw new Error("Method not implemented.");
  }
  async listAll() {
    return this.hunters;
  }
  async findById(id: string): Promise<HunterEntity | undefined> {
    return this.hunters.find((hunter) => hunter.id === id);
  }
}
