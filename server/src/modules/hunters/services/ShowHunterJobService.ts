import { AppError } from "@shared/errors/AppError";
import { HunterEntity } from "../entities/HunterEntity";
import { IHuntersRepository } from "../repositories/interfaces/IHuntersRepository";

export default class ShowHunterJobService {
  constructor(private hunterRepository: IHuntersRepository) {
    this.hunterRepository = hunterRepository;
  }

  async execute(id: string): Promise<HunterEntity> {
    if (!id) {
      throw new AppError("Id not provided");
    }

    const hunter = await this.hunterRepository.findById(id);
    if (!hunter) {
      throw new AppError("Hunter not found");
    }

    return hunter;
  }
}
