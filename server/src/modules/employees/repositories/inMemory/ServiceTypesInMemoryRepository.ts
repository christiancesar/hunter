import { ICreateServiceTypeDTO } from "../../dtos/ICreateServiceTypeDTO";
import { IUpdateServiceTypeDTO } from "../../dtos/IUpdateServiceTypeDTO";
import { ServiceTypeEntity } from "../../entities/ServiceTypeEntity";
import { IServiceTypesRepository } from "../IServiceTypesRepository";

export class ServiceTypesInMemoryRepository implements IServiceTypesRepository {
  public serviceTypes: ServiceTypeEntity[] = [];

  async findById(id: string): Promise<ServiceTypeEntity | null> {
    return (
      this.serviceTypes.find((serviceType) => serviceType.id === id) || null
    );
  }

  async findByName(name: string): Promise<ServiceTypeEntity | null> {
    const nameExist = this.serviceTypes.find(
      (serviceType) => serviceType.name === name,
    );

    return nameExist || null;
  }
  async create({
    commissionPercent,
    name,
  }: ICreateServiceTypeDTO): Promise<ServiceTypeEntity> {
    const serviceType: ServiceTypeEntity = {
      id: crypto.randomUUID(),
      commissionPercent,
      name,
      employess: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.serviceTypes.push(serviceType);
    return serviceType;
  }
  async save({
    id,
    commissionPercent,
    name,
  }: IUpdateServiceTypeDTO): Promise<ServiceTypeEntity> {
    const serviceTypeIndex = this.serviceTypes.findIndex((serviceType) => {
      return serviceType.id === id;
    });

    this.serviceTypes[serviceTypeIndex] = {
      ...this.serviceTypes[serviceTypeIndex],
      name: name || this.serviceTypes[serviceTypeIndex].name,
      commissionPercent:
        commissionPercent ||
        this.serviceTypes[serviceTypeIndex].commissionPercent,
      updatedAt: new Date(),
    };

    return this.serviceTypes[serviceTypeIndex];
  }
  async listAll(): Promise<ServiceTypeEntity[]> {
    return this.serviceTypes;
  }
  deleteAllRecordsSeed(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
