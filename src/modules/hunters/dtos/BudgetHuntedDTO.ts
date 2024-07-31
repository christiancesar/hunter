import { BudgetItemHuntedDTO } from "./BudgetItemHuntedDTO";
import { LooseItemHuntedDTO } from "./LooseItemHuntedDTO";

export type BudgetHuntedDTO = {
  NroOrc: string;

  Situao: string;

  Licena: string;

  NomeRazoCliente: string;

  Vlr: string;

  Vendedor: string;

  VlrFaturado: string;

  SaldoFaturar: string;

  DtCadastro: string;

  DtPrevEntrega: string;

  Cliente: string;

  Fone: string;

  Celular: string;

  NoPedTemp: string;

  Fone2: string;

  Endereco: string;

  NroCasa: string;

  Bairro: string;

  UF: string;

  Cidade: string;

  CodRef: string;

  ConfiTemp: string;

  DtVenda: string;

  DtFaturado: string;

  Email: string;

  EstagioProduo: string;

  DtProd: string;

  DtRetorno: string;

  NomeTempera: string;

  DtConfCliente: string;

  ResponsavelObra: string;

  OramentoObraNome: string;

  EnvioTemp: string;

  UsuarioEnvio: string;

  Loja: string;

  OrcOriginal: string;

  Arquiteto: string;

  DescMarkup: string;

  MarkupTotal: string;

  DtAlterado: string;

  Calculado: string;

  Usuario: string;

  ErronoClculo: string;

  TEMNFe: string;

  CdNF: string;

  Comisso: string;

  SimCompAcess: string;

  DtPrevAcess: string;

  SimCompPerf: string;

  DtPrevPerfil: string;

  DataCancelado: string;

  MotivoCancelamento: string;

  MotivodeCancelamento: string;

  CatlogoAtualizado: string;

  Entregueem: string;

  DtAprovaoCliente: string;

  DtGarantiaPerfis: string;

  DtGarantiaAcessorios: string;

  DtGarantiaServios: string;

  DtGarantiaVidro: string;

  ClienteComoConheceuId: string;

  ClienteCodigo: string;

  DtAgendaInst: string;

  AgendaDtFinaliz: string;

  ComoConheceu: string;

  Recusado: string;

  link: string;

  itenscesta: string;

  vendaitens: string;

  valorbruto: string;

  valordesconto: string;

  valorliquido: string;

  items: BudgetItemHuntedDTO[];

  looseItems: LooseItemHuntedDTO[];
};
