import { CustomerEntity } from "../../entities/CustomerEntity";
import { ICustomersRepository } from "../../repositories/interfaces/ICustomersRepository";

export default class ListAllCustomersService {
  constructor(private customersRepository: ICustomersRepository) {
    this.customersRepository = customersRepository;
  }
  async execute(): Promise<CustomerEntity[]> {
    const customers = await this.customersRepository.listAll();
    return customers;
  }
}
