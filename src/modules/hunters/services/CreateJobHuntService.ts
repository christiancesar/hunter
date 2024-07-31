import { CreateHunterDTO } from "../dtos/CreateHunterDTO";
import { HunterEntity } from "../entities/HunterEntity";
import { IHuntersRepository } from "../repositories/interfaces/IHuntersRepository";

export default class CreateJobHuntService {
  constructor(private huntersRepository: IHuntersRepository) {
    this.huntersRepository = huntersRepository;
  }

  async execute({
    credentials,
    filter,
  }: CreateHunterDTO): Promise<HunterEntity> {
    const hunter = await this.huntersRepository.create({
      credentials,
      filter,
    });

    return hunter;
  }
}
