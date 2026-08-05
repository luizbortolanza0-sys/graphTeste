import React from 'react';
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from '@mui/material';
import { useDashboard } from '../../context/DashboardContext';
import { useColorMode } from '../../context/ThemeContext';
import type { PeriodoFiltro } from '../../types/filters';
import type { CategoriaVeiculo, StatusChecklist } from '../../types/checklist';

const PERIODOS: PeriodoFiltro[] = ['Semana', 'Mês', 'Ano', 'Personalizado'];
const STATUS_OPTIONS: (StatusChecklist | 'Todos')[] = ['Todos', 'Aprovado', 'Reprovado', 'Pendente', 'Forçado', 'Sem análise'];
const CATEGORIAS_OPTIONS: (CategoriaVeiculo | 'Todos')[] = ['Todos', 'Caminhão', 'Truck', 'Carreta', 'Bitrem', 'Rodotrem'];
const EMPRESAS = ['Todos', 'TransLog Logística'];
const FILIAIS = ['Todos', 'São Paulo - Matriz', 'Curitiba - Filial', 'Belo Horizonte - Filial'];

const selectSx = {
  borderRadius: '10px',
  fontSize: '0.82rem',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'divider',
  },
};

export const DashboardFiltersBar: React.FC = () => {
  const { filters, setFilter } = useDashboard();
  const { mode } = useColorMode();

  return (
    <Paper
      elevation={0}
      sx={{
        px: { xs: 2, sm: 2.5 },
        py: 2,
        borderRadius: '16px',
        bgcolor: mode === 'dark' ? 'rgba(26, 29, 39, 0.6)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(8px)',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        {/* Período */}
        <FormControl size="small" sx={{ minWidth: 130, flex: { xs: '1 1 calc(50% - 6px)', md: '0 0 auto' } }}>
          <InputLabel id="select-periodo-label" sx={{ fontSize: '0.82rem' }}>Período</InputLabel>
          <Select
            labelId="select-periodo-label"
            value={filters.periodo}
            label="Período"
            onChange={(e) => setFilter('periodo', e.target.value as PeriodoFiltro)}
            sx={selectSx}
          >
            {PERIODOS.map((p) => (
              <MenuItem key={p} value={p} sx={{ fontSize: '0.82rem' }}>{p}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Status */}
        <FormControl size="small" sx={{ minWidth: 130, flex: { xs: '1 1 calc(50% - 6px)', md: '0 0 auto' } }}>
          <InputLabel id="select-status-label" sx={{ fontSize: '0.82rem' }}>Status</InputLabel>
          <Select
            labelId="select-status-label"
            value={filters.status}
            label="Status"
            onChange={(e) => setFilter('status', e.target.value as any)}
            sx={selectSx}
          >
            {STATUS_OPTIONS.map((st) => (
              <MenuItem key={st} value={st} sx={{ fontSize: '0.82rem' }}>{st}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Categoria */}
        <FormControl size="small" sx={{ minWidth: 130, flex: { xs: '1 1 calc(50% - 6px)', md: '0 0 auto' } }}>
          <InputLabel id="select-categoria-label" sx={{ fontSize: '0.82rem' }}>Categoria</InputLabel>
          <Select
            labelId="select-categoria-label"
            value={filters.categoria}
            label="Categoria"
            onChange={(e) => setFilter('categoria', e.target.value as any)}
            sx={selectSx}
          >
            {CATEGORIAS_OPTIONS.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ fontSize: '0.82rem' }}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Empresa */}
        <FormControl size="small" sx={{ minWidth: 160, flex: { xs: '1 1 calc(50% - 6px)', md: '0 0 auto' } }}>
          <InputLabel id="select-empresa-label" sx={{ fontSize: '0.82rem' }}>Empresa</InputLabel>
          <Select
            labelId="select-empresa-label"
            value={filters.empresa}
            label="Empresa"
            onChange={(e) => setFilter('empresa', e.target.value as string)}
            sx={selectSx}
          >
            {EMPRESAS.map((emp) => (
              <MenuItem key={emp} value={emp} sx={{ fontSize: '0.82rem' }}>{emp}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Filial */}
        <FormControl size="small" sx={{ minWidth: 170, flex: { xs: '1 1 calc(50% - 6px)', md: '0 0 auto' } }}>
          <InputLabel id="select-filial-label" sx={{ fontSize: '0.82rem' }}>Filial</InputLabel>
          <Select
            labelId="select-filial-label"
            value={filters.filial}
            label="Filial"
            onChange={(e) => setFilter('filial', e.target.value as string)}
            sx={selectSx}
          >
            {FILIAIS.map((fil) => (
              <MenuItem key={fil} value={fil} sx={{ fontSize: '0.82rem' }}>{fil}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date inputs */}
        {filters.periodo === 'Personalizado' && (
          <>
            <TextField
              size="small"
              type="date"
              label="Data Início"
              slotProps={{ inputLabel: { shrink: true } }}
              value={filters.dataInicio || ''}
              onChange={(e) => setFilter('dataInicio', e.target.value || null)}
              sx={{ 
                minWidth: 150, 
                flex: { xs: '1 1 calc(50% - 6px)', md: '0 0 auto' },
                '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '0.82rem' },
              }}
            />
            <TextField
              size="small"
              type="date"
              label="Data Fim"
              slotProps={{ inputLabel: { shrink: true } }}
              value={filters.dataFim || ''}
              onChange={(e) => setFilter('dataFim', e.target.value || null)}
              sx={{ 
                minWidth: 150, 
                flex: { xs: '1 1 calc(50% - 6px)', md: '0 0 auto' },
                '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '0.82rem' },
              }}
            />
          </>
        )}
      </Box>
    </Paper>
  );
};
