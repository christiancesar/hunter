import { HunterCredentialDTO } from "./HunterCredentialDTO";
import { HunterFilterDTO } from "./HunterFilterDTO";

export type CreateHunterDTO = {
  credentials: HunterCredentialDTO;
  filter: HunterFilterDTO;
};
