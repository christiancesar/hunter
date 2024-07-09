import { IServiceTypesRepository } from "../../repositories/IServiceTypesRepository";

export default class DeleteAllRecordsSeedService {
  private serviceTypesRepository: IServiceTypesRepository;
  constructor(serviceTypesRepository: IServiceTypesRepository) {
    this.serviceTypesRepository = serviceTypesRepository;
  }

  async execute() {
    await this.serviceTypesRepository.deleteAllRecordsSeed();
  }
}
