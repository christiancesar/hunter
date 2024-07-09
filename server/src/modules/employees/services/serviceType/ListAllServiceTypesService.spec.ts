import { beforeEach, describe, expect, it } from "vitest";
import { IServiceTypesRepository } from "../../repositories/IServiceTypesRepository";
import { ServiceTypesInMemoryRepository } from "../../repositories/inMemory/ServiceTypesInMemoryRepository";
import CreateServiceTypeService from "./CreateServiceTypeService";
import ListAllServiceTypesService from "./ListAllServiceTypesService";

let serviceTypesRepository: IServiceTypesRepository;
let createServiceTypeService: CreateServiceTypeService;
let listAllServiceTypesService: ListAllServiceTypesService;

describe("List All Services Type Service", () => {
  beforeEach(() => {
    serviceTypesRepository = new ServiceTypesInMemoryRepository();
    createServiceTypeService = new CreateServiceTypeService(
      serviceTypesRepository,
    );
    listAllServiceTypesService = new ListAllServiceTypesService(
      serviceTypesRepository,
    );
  });

  it("should be able list all services", async () => {
    await createServiceTypeService.execute({
      name: "Montagem",
      commissionPercent: 1,
    });

    await createServiceTypeService.execute({
      name: "Instalação",
      commissionPercent: 1.5,
    });

    const serviceTypes = await listAllServiceTypesService.execute();

    expect(serviceTypes).toHaveLength(2);
  });
});
