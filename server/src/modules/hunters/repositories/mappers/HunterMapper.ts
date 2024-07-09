import { Hunter } from "@prisma/client";
import { StatusProgressDTO } from "../../dtos/StatusProgressDTO";
import { HunterEntity } from "../../entities/HunterEntity";

class HunterMapper {
  toDomain(hunter: Hunter): HunterEntity {
    return {
      id: hunter.id,
      statusProgressNormalized:
        StatusProgressDTO[hunter.statusProgressNormalized],
      statusProgressHunting: StatusProgressDTO[hunter.statusProgressHunting],
      budgetsHunted: hunter.budgetsHunted,
      errors: hunter.errors,
      budgetsNormalized: hunter.budgetsNormalized,
      createdAt: hunter.createdAt,
      updatedAt: hunter.updatedAt,
      finishedAt: hunter.finishedAt,
    };
  }
}

export default new HunterMapper();
