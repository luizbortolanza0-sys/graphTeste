import React from 'react';
import { Box } from '@mui/material';

import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { MetricCard } from './MetricCard';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';
import { useDashboard } from '../../context/DashboardContext';

export const DashboardCards: React.FC = () => {
  const metrics = useDashboardMetrics();
  const { isRefreshing, filters, toggleStatusFilter } = useDashboard();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(5, 1fr)' },
        gap: { xs: 1.5, sm: 2, md: 2.5 },
      }}
    >
      {/* Card 1: Total de Checklists (Principal Destaque) */}
      <MetricCard
        title="Total de Checklists"
        value={metrics.total.value}
        description="Total consolidado no período"
        icon={<AssignmentRoundedIcon />}
        gradientColors={['#0F8B5F', '#2EB67D']}
        changePercentage={metrics.total.changePercentage}
        isPositive={metrics.total.isPositive}
        isMainHighlight={true}
        isLoading={isRefreshing}
        isActiveFilter={filters.status === 'Todos'}
        onClick={() => toggleStatusFilter('Todos' as any)}
      />

      {/* Card 2: Aprovados */}
      <MetricCard
        title="Aprovados"
        value={metrics.aprovados.value}
        description={`${metrics.aprovados.percentageOfTotal}% do volume total`}
        icon={<CheckCircleRoundedIcon />}
        gradientColors={['#248A3D', '#34C759']}
        changePercentage={metrics.aprovados.changePercentage}
        isPositive={metrics.aprovados.isPositive}
        isLoading={isRefreshing}
        isActiveFilter={filters.status === 'Aprovado'}
        onClick={() => toggleStatusFilter('Aprovado')}
      />

      {/* Card 3: Pendentes */}
      <MetricCard
        title="Pendentes"
        value={metrics.pendentes.value}
        description={`${metrics.pendentes.percentageOfTotal}% aguardando análise`}
        icon={<HourglassTopRoundedIcon />}
        gradientColors={['#B27B16', '#FFB020']}
        changePercentage={metrics.pendentes.changePercentage}
        isPositive={metrics.pendentes.isPositive}
        isLoading={isRefreshing}
        isActiveFilter={filters.status === 'Pendente'}
        onClick={() => toggleStatusFilter('Pendente')}
      />
      
      <MetricCard
        title="Reprovados"
        value={metrics.reprovados.value}
        description={`${metrics.reprovados.percentageOfTotal}% reprovados no período`}
        icon={<ErrorRoundedIcon />}
        gradientColors={['#FF003C', '#FF4F7E']}
        changePercentage={metrics.reprovados.changePercentage}
        isPositive={metrics.reprovados.isPositive}
        isLoading={isRefreshing}
        isActiveFilter={filters.status === 'Reprovado'}
        onClick={() => toggleStatusFilter('Reprovado')}
      />

      {/* Card 4: Tempo Médio */}
      <MetricCard
        title="Tempo Médio"
        value={metrics.tempoMedio.value}
        description="Duração média por checklist"
        icon={<AccessTimeRoundedIcon />}
        gradientColors={['#1E40AF', '#3B82F6']}
        changePercentage={metrics.tempoMedio.changePercentage}
        isPositive={metrics.tempoMedio.isPositive}
        isLoading={isRefreshing}
      />


    </Box>
  );
};
