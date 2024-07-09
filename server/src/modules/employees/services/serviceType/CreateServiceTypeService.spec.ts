import { beforeEach, describe, expect, it } from "vitest";
import CreateServiceTypeService from "./CreateServiceTypeService";
import { IServiceTypesRepository } from "../../repositories/IServiceTypesRepository";
import { ServiceTypesInMemoryRepository } from "../../repositories/inMemory/ServiceTypesInMemoryRepository";
import { AppError } from "@shared/errors/AppError";

let serviceTypesRepository: IServiceTypesRepository;
let createServiceTypeService: CreateServiceTypeService;

describe("Create Service Type Service", () => {
  beforeEach(() => {
    serviceTypesRepository = new ServiceTypesInMemoryRepository();
    createServiceTypeService = new CreateServiceTypeService(
      serviceTypesRepository,
    );
  });

  it("should be able create service type", async () => {
    const serviceType = await createServiceTypeService.execute({
      name: "montagem",
      commissionPercent: 1,
    });

    expect(serviceType).toHaveProperty("id");
  });

  it("should not be able create service type if name not sent", async () => {
    await expect(() =>
      createServiceTypeService.execute({
        name: "",
        commissionPercent: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
