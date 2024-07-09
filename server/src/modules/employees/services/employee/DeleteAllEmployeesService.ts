import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";

export default class DeleteAllEmployeesService {
  private employeesRepository: IEmployeesRepository;
  constructor(employeesRepository: IEmployeesRepository) {
    this.employeesRepository = employeesRepository;
  }

  async execute() {
    await this.employeesRepository.deleteAll();
  }
}
