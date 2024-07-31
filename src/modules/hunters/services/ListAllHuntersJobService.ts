import { HunterEntity } from "../entities/HunterEntity";
import { IHuntersRepository } from "../repositories/interfaces/IHuntersRepository";

export default class ListAllHuntersJobService {
  constructor(private hunterRepository: IHuntersRepository) {
    this.hunterRepository = hunterRepository;
  }

  async execute(): Promise<HunterEntity[]> {
    return this.hunterRepository.listAll();
  }
}
