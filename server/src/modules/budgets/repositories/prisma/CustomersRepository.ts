import { prisma } from "@shared/database/prisma";
import { CustomerEntity } from "../../entities/CustomerEntity";
import {
  CreateCustomerDTO,
  ICustomersRepository,
} from "../interfaces/ICustomersRepository";

export default class CustomersRepository implements ICustomersRepository {
  create({
    phones,
    name,
    email,
    address,
  }: CreateCustomerDTO): Promise<CustomerEntity> {
    const customer = prisma.customer.upsert({
      where: {
        name: name,
      },
      update: {
        phones: {
          set: phones,
        },
        email,
        address: {
          update: {
            street: address.street,
            number: address.number,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
          },
        },
      },
      create: {
        name,
        phones: {
          set: phones,
        },
        email,
        address: {
          create: {
            street: address.street,
            number: address.number,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
          },
        },
      },
      include: {
        address: true,
      },
    });
    return customer;
  }

  async findByName(name: string): Promise<CustomerEntity | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        name: name,
      },
      include: {
        address: true,
      },
    });

    return customer;
  }

  async findById(id: string): Promise<CustomerEntity | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        id: id,
      },
      include: {
        address: true,
        budgets: true,
      },
    });

    return customer;
  }

  listAll(): Promise<CustomerEntity[]> {
    const customers = prisma.customer.findMany({
      include: {
        address: true,
      },
    });

    return customers;
  }
}
