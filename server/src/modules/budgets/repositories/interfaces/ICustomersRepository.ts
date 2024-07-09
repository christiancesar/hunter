import { CustomerEntity } from "../../entities/CustomerEntity";

type CreateAddressDTO = {
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
};

export type CreateCustomerDTO = {
  name: string;
  phones: string[];
  email: string;
  address: CreateAddressDTO;
};

export interface ICustomersRepository {
  create(customer: CreateCustomerDTO): Promise<CustomerEntity>;
  findByName(name: string): Promise<CustomerEntity | null>;
  findById(id: string): Promise<CustomerEntity | null>;
  listAll(): Promise<CustomerEntity[]>;
}
