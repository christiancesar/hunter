import { Request, Response } from "express";
import CustomersRepository from "../repositories/prisma/CustomersRepository";
import ListAllCustomersService from "../services/customers/ListAllCustomersService";
import ShowCustomerService from "../services/customers/ShowCustomerService";

export default class CustomerController {
  async index(request: Request, response: Response): Promise<Response> {
    const customersRepository = new CustomersRepository();
    const listAllCustomersService = new ListAllCustomersService(
      customersRepository,
    );
    const customers = await listAllCustomersService.execute();
    return response.json(customers);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const customersRepository = new CustomersRepository();
    const showCustomerService = new ShowCustomerService(customersRepository);
    const customer = await showCustomerService.execute(id);
    return response.json(customer);
  }
}
