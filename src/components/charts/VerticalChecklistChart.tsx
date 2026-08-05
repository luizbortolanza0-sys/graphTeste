import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ChartCardWrapper } from './ChartCardWrapper';
import { useDashboard } from '../../context/DashboardContext';
import { useColorMode } from '../../context/ThemeContext';
import type { PeriodoFiltro } from '../../types/filters';

export const VerticalChecklistChart: React.FC = () => {
  const { mode } = useColorMode();
  const { filteredChecklists, isRefreshing } = useDashboard();
  const [periodoView, setPeriodoView] = useState<PeriodoFiltro>('Mês');

  const chartData = useMemo(() => {
    // Agrupamento temporal inteligente baseado em periodoView
    const map = new Map<string, number>();

    if (periodoView === 'Semana') {
      // 7 dias da semana
      const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      dias.forEach((d) => map.set(d, 0));
      filteredChecklists.forEach((item) => {
        const date = new Date(item.data);
        const dayName = dias[date.getDay()];
        map.set(dayName, (map.get(dayName) || 0) + 1);
      });
    } else if (periodoView === 'Mês') {
      // 4 semanas do mês
      map.set('Semana 1', 0);
      map.set('Semana 2', 0);
      map.set('Semana 3', 0);
      map.set('Semana 4', 0);

      filteredChecklists.forEach((item) => {
        const day = new Date(item.data).getDate();
        if (day <= 7) map.set('Semana 1', (map.get('Semana 1') || 0) + 1);
        else if (day <= 14) map.set('Semana 2', (map.get('Semana 2') || 0) + 1);
        else if (day <= 21) map.set('Semana 3', (map.get('Semana 3') || 0) + 1);
        else map.set('Semana 4', (map.get('Semana 4') || 0) + 1);
      });
    } else {
      // 12 meses do ano
      const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      meses.forEach((m) => map.set(m, 0));

      filteredChecklists.forEach((item) => {
        const monthIndex = new Date(item.data).getMonth();
        const mName = meses[monthIndex];
        map.set(mName, (map.get(mName) || 0) + 1);
      });
    }

    return {
      labels: Array.from(map.keys()),
      values: Array.from(map.values()),
    };
  }, [filteredChecklists, periodoView]);

  const option = useMemo(() => {
    const textColor = mode === 'dark' ? '#9CA3AF' : '#6B7280';
    const borderColor = mode === 'dark' ? '#2D3140' : '#E5E7EB';

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: mode === 'dark' ? '#1A1D27' : '#FFFFFF',
        borderColor: borderColor,
        textStyle: { color: mode === 'dark' ? '#E5E7EB' : '#1F2937' },
        valueFormatter: (value: number) => `${value} checklists`,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '6%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: chartData.labels,
        axisLabel: { color: textColor, fontWeight: 500 },
        axisLine: { lineStyle: { color: borderColor } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } },
      },
      series: [
        {
          name: 'Volume de Checklists',
          type: 'bar',
          data: chartData.values,
          barWidth: '40%',
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#2EB67D' },
                { offset: 1, color: '#0F8B5F' },
              ],
            },
          },
          emphasis: {
            itemStyle: {
              color: '#34C759',
            },
          },
        },
      ],
    };
  }, [chartData, mode]);

  const headerAction = (
    <ToggleButtonGroup
      size="small"
      value={periodoView}
      exclusive
      onChange={(_, val) => val && setPeriodoView(val)}
      sx={{
        height: 28,
        '& .MuiToggleButton-root': {
          fontSize: '0.75rem',
          px: 1.2,
          py: 0,
          borderRadius: '8px',
          fontWeight: 600,
          textTransform: 'none',
        },
      }}
    >
      <ToggleButton value="Semana">Semana</ToggleButton>
      <ToggleButton value="Mês">Mês</ToggleButton>
      <ToggleButton value="Ano">Ano</ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <ChartCardWrapper
      title="Checklist por Período"
      description="Volume acumulado de inspeções"
      headerAction={headerAction}
      isLoading={isRefreshing}
    >
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </ChartCardWrapper>
  );
};
