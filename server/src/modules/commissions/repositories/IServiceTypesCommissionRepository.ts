import { ICreateServiceTypeCommissionDTO } from "../dtos/ICreateServiceTypeCommissionDTO";
import { IUpdateServiceTypeCommissionDTO } from "../dtos/IUpdateServiceTypeCommissionDTO";
import { ServiceTypeCommissionEntity } from "../entities/ServiceTypeCommissionEntity";

export interface IServiceTypesCommissionRepository {
  findById(id: string): Promise<ServiceTypeCommissionEntity | null>;
  findByName(name: string): Promise<ServiceTypeCommissionEntity | null>;
  create(
    name: ICreateServiceTypeCommissionDTO,
  ): Promise<ServiceTypeCommissionEntity>;
  update(
    data: IUpdateServiceTypeCommissionDTO,
  ): Promise<ServiceTypeCommissionEntity>;
  delete(id: string): Promise<void>;
  listAll(): Promise<ServiceTypeCommissionEntity[]>;
}
