import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Checklist, StatusChecklist, CategoriaVeiculo } from '../types/checklist';
import type { DashboardFiltersState } from '../types/filters';
import { mockChecklists } from '../mock/checklists';

const initialFilters: DashboardFiltersState = {
  searchQuery: '',
  dataInicio: null,
  dataFim: null,
  periodo: 'Ano',
  status: 'Todos',
  categoria: 'Todos',
  empresa: 'Todos',
  filial: 'Todos',
};

interface ActiveFilterChip {
  key: keyof DashboardFiltersState;
  label: string;
  valueDisplay: string;
}

interface DashboardContextType {
  filters: DashboardFiltersState;
  rawChecklists: Checklist[];
  filteredChecklists: Checklist[];
  isRefreshing: boolean;
  activeChips: ActiveFilterChip[];
  setFilter: <K extends keyof DashboardFiltersState>(key: K, value: DashboardFiltersState[K]) => void;
  clearFilter: (key: keyof DashboardFiltersState) => void;
  clearAllFilters: () => void;
  triggerRefresh: () => void;
  // Cross-filtering helpers
  toggleStatusFilter: (status: StatusChecklist) => void;
  toggleCategoriaFilter: (categoria: CategoriaVeiculo) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<DashboardFiltersState>(initialFilters);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const setFilter = useCallback(<K extends keyof DashboardFiltersState>(key: K, value: DashboardFiltersState[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const clearFilter = useCallback((key: keyof DashboardFiltersState) => {
    setFilters((prev) => ({
      ...prev,
      [key]: initialFilters[key],
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const triggerRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  }, []);

  const toggleStatusFilter = useCallback((status: StatusChecklist) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status === status ? 'Todos' : status,
    }));
  }, []);

  const toggleCategoriaFilter = useCallback((categoria: CategoriaVeiculo) => {
    setFilters((prev) => ({
      ...prev,
      categoria: prev.categoria === categoria ? 'Todos' : categoria,
    }));
  }, []);

  // Lógica principal de filtragem memoizada
  const filteredChecklists = useMemo(() => {
    return mockChecklists.filter((item) => {
      // Pesquisa por placa, motorista ou id
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchPlaca = item.placa.toLowerCase().includes(q);
        const matchMotorista = item.motorista.toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q);
        const matchVeiculo = item.veiculo.toLowerCase().includes(q);
        if (!matchPlaca && !matchMotorista && !matchId && !matchVeiculo) return false;
      }

      // Filtro Status
      if (filters.status !== 'Todos' && item.status !== filters.status) {
        return false;
      }

      // Filtro Categoria
      if (filters.categoria !== 'Todos' && item.categoria !== filters.categoria) {
        return false;
      }

      // Filtro Empresa
      if (filters.empresa !== 'Todos' && item.empresa !== filters.empresa) {
        return false;
      }

      // Filtro Filial
      if (filters.filial !== 'Todos' && item.filial !== filters.filial) {
        return false;
      }

      // Filtro Período
      if (filters.periodo !== 'Personalizado') {
        const itemDate = new Date(item.data);
        const now = new Date('2026-08-04'); // data base mock
        let diffDays = (now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);

        if (filters.periodo === 'Semana' && diffDays > 7) return false;
        if (filters.periodo === 'Mês' && diffDays > 30) return false;
        if (filters.periodo === 'Ano' && diffDays > 365) return false;
      } else {
        if (filters.dataInicio && item.data < filters.dataInicio) return false;
        if (filters.dataFim && item.data > filters.dataFim) return false;
      }

      return true;
    });
  }, [filters]);

  // Lista de chips ativos
  const activeChips = useMemo(() => {
    const chips: ActiveFilterChip[] = [];

    if (filters.periodo !== 'Ano') {
      chips.push({ key: 'periodo', label: 'Período', valueDisplay: filters.periodo });
    }
    if (filters.status !== 'Todos') {
      chips.push({ key: 'status', label: 'Status', valueDisplay: filters.status });
    }
    if (filters.categoria !== 'Todos') {
      chips.push({ key: 'categoria', label: 'Categoria', valueDisplay: filters.categoria });
    }
    if (filters.empresa !== 'Todos') {
      chips.push({ key: 'empresa', label: 'Empresa', valueDisplay: filters.empresa });
    }
    if (filters.filial !== 'Todos') {
      chips.push({ key: 'filial', label: 'Filial', valueDisplay: filters.filial });
    }
    if (filters.dataInicio || filters.dataFim) {
      chips.push({ 
        key: 'dataInicio', 
        label: 'Data', 
        valueDisplay: `${filters.dataInicio || 'Início'} até ${filters.dataFim || 'Fim'}` 
      });
    }

    return chips;
  }, [filters]);

  return (
    <DashboardContext.Provider
      value={{
        filters,
        rawChecklists: mockChecklists,
        filteredChecklists,
        isRefreshing,
        activeChips,
        setFilter,
        clearFilter,
        clearAllFilters,
        triggerRefresh,
        toggleStatusFilter,
        toggleCategoriaFilter,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard deve ser utilizado dentro de um DashboardProvider');
  }
  return context;
};
