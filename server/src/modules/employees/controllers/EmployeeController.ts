import { Request, Response } from "express";
import EmployeesRepository from "../repositories/prisma/EmployeesRepository";
import CreateEmployeeService from "../services/employee/CreateEmployeeService";
import ListAllEmployeesService from "../services/employee/ListAllEmployeesService";
import ShowEmployeeService from "../services/employee/ShowEmployeeService";
import ServiceTypesRepository from "../repositories/prisma/ServiceTypesRepository";
import UpdateEmployeeService from "../services/employee/UpdateEmployeeService";

export default class EmployeeController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, serviceTypeIds } = request.body;
    const employeesRepository = new EmployeesRepository();
    const serviceTypesRepository = new ServiceTypesRepository();
    const createEmployeeService = new CreateEmployeeService(
      employeesRepository,
      serviceTypesRepository,
    );
    const employee = await createEmployeeService.execute({
      name,
      serviceTypeIds,
    });

    return response.json(employee);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const employeesRepository = new EmployeesRepository();
    const listAllEmployeesService = new ListAllEmployeesService(
      employeesRepository,
    );
    const employees = await listAllEmployeesService.execute();
    return response.json(employees);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const employeesRepository = new EmployeesRepository();
    const showEmployeeService = new ShowEmployeeService(employeesRepository);
    const employee = await showEmployeeService.execute(id);
    return response.json(employee);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, name, serviceTypeIds } = request.body;
    const employeesRepository = new EmployeesRepository();
    const serviceTypesRepository = new ServiceTypesRepository();
    const updateEmployeeService = new UpdateEmployeeService(
      employeesRepository,
    );
    const employee = await updateEmployeeService.execute({
      id,
      name,
      serviceTypeIds,
    });

    return response.json(employee);
  }
}
