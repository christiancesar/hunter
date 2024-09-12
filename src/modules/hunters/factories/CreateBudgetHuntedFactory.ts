import { BudgetHuntedDTO } from "../dtos/BudgetHuntedDTO";
import { BudgetItemHuntedDTO } from "../dtos/BudgetItemHuntedDTO";
import { LooseItemHuntedDTO } from "../dtos/LooseItemHuntedDTO";

type CreateBudgetHuntedFactoryParams = {
  NroOrc?: string;
  Situao?: string;
  Licena?: string;
  NomeRazoCliente?: string;
  Vlr?: string;
  Vendedor?: string;
  VlrFaturado?: string;
  SaldoFaturar?: string;
  DtCadastro?: string;
  DtPrevEntrega?: string;
  Cliente?: string;
  Fone?: string;
  Celular?: string;
  NoPedTemp?: string;
  Fone2?: string;
  Endereco?: string;
  NroCasa?: string;
  Bairro?: string;
  UF?: string;
  Cidade?: string;
  CodRef?: string;
  ConfiTemp?: string;
  DtVenda?: string;
  DtFaturado?: string;
  Email?: string;
  EstagioProduo?: string;
  DtProd?: string;
  DtRetorno?: string;
  NomeTempera?: string;
  DtConfCliente?: string;
  ResponsavelObra?: string;
  OramentoObraNome?: string;
  EnvioTemp?: string;
  UsuarioEnvio?: string;
  Loja?: string;
  OrcOriginal?: string;
  Arquiteto?: string;
  DescMarkup?: string;
  MarkupTotal?: string;
  DtAlterado?: string;
  Calculado?: string;
  Usuario?: string;
  ErronoClculo?: string;
  TEMNFe?: string;
  CdNF?: string;
  Comisso?: string;
  SimCompAcess?: string;
  DtPrevAcess?: string;
  SimCompPerf?: string;
  DtPrevPerfil?: string;
  DataCancelado?: string;
  MotivoCancelamento?: string;
  MotivodeCancelamento?: string;
  CatlogoAtualizado?: string;
  Entregueem?: string;
  DtAprovaoCliente?: string;
  DtGarantiaPerfis?: string;
  DtGarantiaAcessorios?: string;
  DtGarantiaServios?: string;
  DtGarantiaVidro?: string;
  ClienteComoConheceuId?: string;
  ClienteCodigo?: string;
  DtAgendaInst?: string;
  AgendaDtFinaliz?: string;
  ComoConheceu?: string;
  Recusado?: string;
  link?: string;
  itenscesta?: string;
  vendaitens?: string;
  valorbruto?: string;
  valordesconto?: string;
  valorliquido?: string;
  items?: BudgetItemHuntedDTO[];
  looseItems?: LooseItemHuntedDTO[];
};

export class CreateBudgetHuntedFactory {
  static make(budget?: CreateBudgetHuntedFactoryParams): BudgetHuntedDTO {
    return {
      NroOrc: budget?.NroOrc ?? "",
      Situao: budget?.Situao ?? "",
      Licena: budget?.Licena ?? "",
      NomeRazoCliente: budget?.NomeRazoCliente ?? "",
      Vlr: budget?.Vlr ?? "",
      Vendedor: budget?.Vendedor ?? "",
      VlrFaturado: budget?.VlrFaturado ?? "",
      SaldoFaturar: budget?.SaldoFaturar ?? "",
      DtCadastro: budget?.DtCadastro ?? "",
      DtPrevEntrega: budget?.DtPrevEntrega ?? "",
      Cliente: budget?.Cliente ?? "",
      Fone: budget?.Fone ?? "",
      Celular: budget?.Celular ?? "",
      NoPedTemp: budget?.NoPedTemp ?? "",
      Fone2: budget?.Fone2 ?? "",
      Endereco: budget?.Endereco ?? "",
      NroCasa: budget?.NroCasa ?? "",
      Bairro: budget?.Bairro ?? "",
      UF: budget?.UF ?? "",
      Cidade: budget?.Cidade ?? "",
      CodRef: budget?.CodRef ?? "",
      ConfiTemp: budget?.ConfiTemp ?? "",
      DtVenda: budget?.DtVenda ?? "",
      DtFaturado: budget?.DtFaturado ?? "",
      Email: budget?.Email ?? "",
      EstagioProduo: budget?.EstagioProduo ?? "",
      DtProd: budget?.DtProd ?? "",
      DtRetorno: budget?.DtRetorno ?? "",
      NomeTempera: budget?.NomeTempera ?? "",
      DtConfCliente: budget?.DtConfCliente ?? "",
      ResponsavelObra: budget?.ResponsavelObra ?? "",
      OramentoObraNome: budget?.OramentoObraNome ?? "",
      EnvioTemp: budget?.EnvioTemp ?? "",
      UsuarioEnvio: budget?.UsuarioEnvio ?? "",
      Loja: budget?.Loja ?? "",
      OrcOriginal: budget?.OrcOriginal ?? "",
      Arquiteto: budget?.Arquiteto ?? "",
      DescMarkup: budget?.DescMarkup ?? "",
      MarkupTotal: budget?.MarkupTotal ?? "",
      DtAlterado: budget?.DtAlterado ?? "",
      Calculado: budget?.Calculado ?? "",
      Usuario: budget?.Usuario ?? "",
      ErronoClculo: budget?.ErronoClculo ?? "",
      TEMNFe: budget?.TEMNFe ?? "",
      CdNF: budget?.CdNF ?? "",
      Comisso: budget?.Comisso ?? "",
      SimCompAcess: budget?.SimCompAcess ?? "",
      DtPrevAcess: budget?.DtPrevAcess ?? "",
      SimCompPerf: budget?.SimCompPerf ?? "",
      DtPrevPerfil: budget?.DtPrevPerfil ?? "",
      DataCancelado: budget?.DataCancelado ?? "",
      MotivoCancelamento: budget?.MotivoCancelamento ?? "",
      MotivodeCancelamento: budget?.MotivodeCancelamento ?? "",
      CatlogoAtualizado: budget?.CatlogoAtualizado ?? "",
      Entregueem: budget?.Entregueem ?? "",
      DtAprovaoCliente: budget?.DtAprovaoCliente ?? "",
      DtGarantiaPerfis: budget?.DtGarantiaPerfis ?? "",
      DtGarantiaAcessorios: budget?.DtGarantiaAcessorios ?? "",
      DtGarantiaServios: budget?.DtGarantiaServios ?? "",
      DtGarantiaVidro: budget?.DtGarantiaVidro ?? "",
      ClienteComoConheceuId: budget?.ClienteComoConheceuId ?? "",
      ClienteCodigo: budget?.ClienteCodigo ?? "",
      DtAgendaInst: budget?.DtAgendaInst ?? "",
      AgendaDtFinaliz: budget?.AgendaDtFinaliz ?? "",
      ComoConheceu: budget?.ComoConheceu ?? "",
      Recusado: budget?.Recusado ?? "",
      link: budget?.link ?? "",
      itenscesta: budget?.itenscesta ?? "",
      vendaitens: budget?.vendaitens ?? "",
      valorbruto: budget?.valorbruto ?? "",
      valordesconto: budget?.valordesconto ?? "",
      valorliquido: budget?.valorliquido ?? "",
      items: budget?.items ?? [],
      looseItems: budget?.looseItems ?? [],
    };
  }
}
