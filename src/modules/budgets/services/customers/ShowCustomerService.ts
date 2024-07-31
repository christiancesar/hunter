import { CustomerEntity } from "../../entities/CustomerEntity";
import { ICustomersRepository } from "../../repositories/interfaces/ICustomersRepository";

export default class ShowCustomerService {
  constructor(private customersRepository: ICustomersRepository) {
    this.customersRepository = customersRepository;
  }
  async execute(id: string): Promise<CustomerEntity> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  }
}
