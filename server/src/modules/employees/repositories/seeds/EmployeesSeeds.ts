import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";
import { ICreateServiceTypeDTO } from "../../dtos/ICreateServiceTypeDTO";
import CreateEmployeeService, {
  ICreateEmployeeServiceDTO,
} from "../../services/employee/CreateEmployeeService";
import DeleteAllEmployeesService from "../../services/employee/DeleteAllEmployeesService";
import ListAllEmployeesService from "../../services/employee/ListAllEmployeesService";
import CreateServiceTypeService from "../../services/serviceType/CreateServiceTypeService";
import DeleteAllRecordsSeedService from "../../services/serviceType/DeleteAllRecordsSeedService";
import ListAllServiceTypesService from "../../services/serviceType/ListAllServiceTypesService";
import EmployeesRepository from "../prisma/EmployeesRepository";
import ServiceTypesRepository from "../prisma/ServiceTypesRepository";

export default class EmployeesSeeds {
  async execute() {
    const serviceTypeDataCreate: ICreateServiceTypeDTO[] = [
      {
        commissionPercent: 1.5,
        name: "Corte 2%",
      },
      {
        commissionPercent: 1.5,
        name: "Corte 1,5%",
      },
      {
        commissionPercent: 1.0,
        name: "Montagem 1%",
      },
      {
        commissionPercent: 1.5,
        name: "Instalação 1,5%",
      },
      {
        commissionPercent: 5.0,
        name: "Instalação de temperado 5%",
      },
      {
        commissionPercent: 10,
        name: "Serviço 10%",
      },
    ];

    const serviceTypesRepository = new ServiceTypesRepository();

    const deleteAllRecordsSeed = new DeleteAllRecordsSeedService(
      serviceTypesRepository,
    );

    await deleteAllRecordsSeed.execute();

    const createTypeRepository = new CreateServiceTypeService(
      serviceTypesRepository,
    );

    const serviceTypesCreatePrimise = serviceTypeDataCreate.map(
      async (serviceType: ICreateServiceTypeDTO) => {
        try {
          return await createTypeRepository.execute(serviceType);
        } catch (error) {
          console.log(error);
        }
      },
    );

    await Promise.all(serviceTypesCreatePrimise);

    const listAllServiceTypes = new ListAllServiceTypesService(
      serviceTypesRepository,
    );
    const serviceTypes = await listAllServiceTypes.execute();

    console.log(`Service Types: ${JSON.stringify(serviceTypes, null, 2)}`);

    const employeeDataCreate: ICreateEmployeeServiceDTO[] = [
      {
        name: "Ademir Jorge",
        serviceTypeIds: [
          serviceTypes.filter(
            (serviceType) => serviceType.name === "Corte 2%",
          )[0].id,
        ],
      },
      {
        name: "Emerson Macedo",
        serviceTypeIds: [
          serviceTypes.filter(
            (serviceType) => serviceType.name === "Corte 1,5%",
          )[0].id,
          serviceTypes.filter(
            (serviceType) => serviceType.name === "Montagem 1%",
          )[0].id,
        ],
      },
    ];

    const employeeRepository = new EmployeesRepository();

    const seleteAllEmployeesService = new DeleteAllEmployeesService(
      employeeRepository,
    );
    seleteAllEmployeesService.execute();

    const createEmployeeService = new CreateEmployeeService(employeeRepository);

    const employeeCreatePrimise = employeeDataCreate.map(
      async (employee: ICreateEmployeeServiceDTO) => {
        try {
          return await createEmployeeService.execute(employee);
        } catch (error) {
          console.log(error);
        }
      },
    );

    await Promise.all(employeeCreatePrimise);

    const listAllEmployees = new ListAllEmployeesService(employeeRepository);
    const employees = await listAllEmployees.execute();
    console.log(`Employees: ${JSON.stringify(employees, null, 2)}`);
  }
}
