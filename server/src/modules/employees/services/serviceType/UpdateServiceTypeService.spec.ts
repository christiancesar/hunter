import { beforeEach, describe, expect, it } from "vitest";
import CreateServiceTypeService from "./CreateServiceTypeService";
import { IServiceTypesRepository } from "../../repositories/IServiceTypesRepository";
import { ServiceTypesInMemoryRepository } from "../../repositories/inMemory/ServiceTypesInMemoryRepository";
import { AppError } from "@shared/errors/AppError";
import UpdateServiceTypeService from "./UpdateServiceTypeService";

let serviceTypesRepository: IServiceTypesRepository;
let createServiceTypeService: CreateServiceTypeService;
let updateServiceTypeService: UpdateServiceTypeService;

describe("Update Service Type Service", () => {
  beforeEach(() => {
    serviceTypesRepository = new ServiceTypesInMemoryRepository();
    createServiceTypeService = new CreateServiceTypeService(
      serviceTypesRepository,
    );
    updateServiceTypeService = new UpdateServiceTypeService(
      serviceTypesRepository,
    );
  });

  it("should be able update service type", async () => {
    const serviceTypeCreated = await createServiceTypeService.execute({
      name: "montagem",
      commissionPercent: 1,
    });

    const serviceType = await updateServiceTypeService.execute({
      id: serviceTypeCreated.id,
      name: "Instalação",
      commissionPercent: 1.5,
    });

    expect(serviceType).toEqual(
      expect.objectContaining({ name: "Instalação" }),
    );
  });

  it("should not be able update service type if id not sent", async () => {
    await expect(() =>
      updateServiceTypeService.execute({
        id: "id-not-exist",
        commissionPercent: 1,
        name: "Instalação",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able update service type if name is empty", async () => {
    const serviceTypeCreated = await createServiceTypeService.execute({
      name: "Montagem",
      commissionPercent: 1,
    });

    await expect(() =>
      updateServiceTypeService.execute({
        id: serviceTypeCreated.id,
        commissionPercent: 1,
        name: "",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able update service type if commissionPercent equal zero", async () => {
    const serviceTypeCreated = await createServiceTypeService.execute({
      name: "Montagem",
      commissionPercent: 1,
    });

    await expect(() =>
      updateServiceTypeService.execute({
        id: serviceTypeCreated.id,
        commissionPercent: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able update service type if name and commissionPercent not sent", async () => {
    const serviceTypeCreated = await createServiceTypeService.execute({
      name: "Montagem",
      commissionPercent: 1,
    });

    await expect(() =>
      updateServiceTypeService.execute({
        id: serviceTypeCreated.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
