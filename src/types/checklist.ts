export type CategoriaVeiculo = 'Caminhão' | 'Truck' | 'Carreta' | 'Bitrem' | 'Rodotrem';

export type StatusChecklist = 'Aprovado' | 'Reprovado' | 'Pendente' | 'Forçado' | 'Sem análise';

export type NomePeriferico = 
  | 'Sirene' 
  | 'Trava do Baú' 
  | 'Sensor de Porta' 
  | 'Desengate de Carreta' 
  | 'Bloqueio' 
  | 'Iluminação';

export interface PerifericoStatus {
  nome: NomePeriferico;
  status: 'Aprovado' | 'Reprovado';
}

export interface Checklist {
  id: string;
  placa: string;
  veiculo: string;
  categoria: CategoriaVeiculo;
  empresa: string;
  filial: string;
  motorista: string;
  status: StatusChecklist;
  tempoChecklist: string; // HH:mm:ss
  perifericos: PerifericoStatus[];
  data: string; // YYYY-MM-DD
  hora: string; // HH:mm:ss
  usuario: string;
}
