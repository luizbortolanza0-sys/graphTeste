import type { CategoriaVeiculo, StatusChecklist } from './checklist';

export type PeriodoFiltro = 'Semana' | 'Mês' | 'Ano' | 'Personalizado';

export interface DashboardFiltersState {
  searchQuery: string;
  dataInicio: string | null;
  dataFim: string | null;
  periodo: PeriodoFiltro;
  status: StatusChecklist | 'Todos';
  categoria: CategoriaVeiculo | 'Todos';
  empresa: string | 'Todos';
  filial: string | 'Todos';
}

export type ActiveFilterKey = keyof Omit<DashboardFiltersState, 'searchQuery'>;
