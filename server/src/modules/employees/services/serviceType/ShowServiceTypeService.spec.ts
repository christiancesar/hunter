import { beforeEach, describe, expect, it } from "vitest";
import CreateServiceTypeService from "./CreateServiceTypeService";
import { IServiceTypesRepository } from "../../repositories/IServiceTypesRepository";
import { ServiceTypesInMemoryRepository } from "../../repositories/inMemory/ServiceTypesInMemoryRepository";
import { AppError } from "@shared/errors/AppError";
import ShowServiceTypeService from "./ShowServiceTypeService";

let serviceTypesRepository: IServiceTypesRepository;
let createServiceTypeService: CreateServiceTypeService;
let showServiceTypeService: ShowServiceTypeService;

describe("Show Service Type Service", () => {
  beforeEach(() => {
    serviceTypesRepository = new ServiceTypesInMemoryRepository();
    createServiceTypeService = new CreateServiceTypeService(
      serviceTypesRepository,
    );
    showServiceTypeService = new ShowServiceTypeService(serviceTypesRepository);
  });

  it("should be able show service type with id", async () => {
    const serviceTypeCreated = await createServiceTypeService.execute({
      name: "montagem",
      commissionPercent: 1,
    });

    const serviceType = await showServiceTypeService.execute(
      serviceTypeCreated.id,
    );

    expect(serviceType).toHaveProperty("id");
  });

  it("should not be able create service type if id not sent", async () => {
    await expect(() =>
      showServiceTypeService.execute("id-not-exist"),
    ).rejects.toBeInstanceOf(AppError);
  });
});
