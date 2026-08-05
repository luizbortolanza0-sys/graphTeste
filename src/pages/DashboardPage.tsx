import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import { ActiveFilterChips } from '../components/filters/ActiveFilterChips';
import { DashboardFiltersBar } from '../components/filters/DashboardFiltersBar';
import { DashboardCards } from '../components/cards/DashboardCards';
import { HorizontalChecklistChart } from '../components/charts/HorizontalChecklistChart';
import { VerticalChecklistChart } from '../components/charts/VerticalChecklistChart';
import { StatusPieChart } from '../components/charts/StatusPieChart';
import { RejectedPeripheralsChart } from '../components/charts/RejectedPeripheralsChart';
import { useDashboard } from '../context/DashboardContext';

export const DashboardPage: React.FC = () => {
  const { filteredChecklists, clearAllFilters } = useDashboard();

  const hasResults = filteredChecklists.length > 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Filters Bar */}
      <DashboardFiltersBar />

      {/* Active Chips */}
      <ActiveFilterChips />

      {/* 4 KPI Cards */}
      <DashboardCards />

      {/* Charts 2x2 Grid or Empty State */}
      {!hasResults ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: '20px',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <InboxRoundedIcon sx={{ fontSize: 56, color: 'text.secondary', opacity: 0.35 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
            Nenhum checklist encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 380, fontSize: '0.82rem' }}>
            Não encontramos registros com a combinação de filtros selecionada. Tente ajustar os parâmetros.
          </Typography>
          <Button variant="contained" color="primary" onClick={clearAllFilters} size="small" sx={{ mt: 1 }}>
            Limpar Todos os Filtros
          </Button>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          <HorizontalChecklistChart />
          <VerticalChecklistChart />
          <StatusPieChart />
          <RejectedPeripheralsChart />
        </Box>
      )}
    </Box>
  );
};
