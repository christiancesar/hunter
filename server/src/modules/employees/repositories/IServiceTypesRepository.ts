import { ICreateServiceTypeDTO } from "../dtos/ICreateServiceTypeDTO";
import { IUpdateServiceTypeDTO } from "../dtos/IUpdateServiceTypeDTO";
import { ServiceTypeEntity } from "../entities/ServiceTypeEntity";

export interface IServiceTypesRepository {
  findById(id: string): Promise<ServiceTypeEntity | null>;
  findByName(name: string): Promise<ServiceTypeEntity | null>;
  create(data: ICreateServiceTypeDTO): Promise<ServiceTypeEntity>;
  save(serviceType: IUpdateServiceTypeDTO): Promise<ServiceTypeEntity>;
  listAll(): Promise<ServiceTypeEntity[]>;

  deleteAllRecordsSeed(): Promise<void>;
}
