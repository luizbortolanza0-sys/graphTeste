import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { ChartCardWrapper } from './ChartCardWrapper';
import { useDashboard } from '../../context/DashboardContext';
import { useColorMode } from '../../context/ThemeContext';
import type { CategoriaVeiculo } from '../../types/checklist';

const CATEGORIAS_LIST: (CategoriaVeiculo | 'Todos')[] = [
  'Todos',
  'Caminhão',
  'Truck',
  'Carreta',
  'Bitrem',
  'Rodotrem',
];

export const HorizontalChecklistChart: React.FC = () => {
  const { mode } = useColorMode();
  const { filteredChecklists, isRefreshing, toggleCategoriaFilter } = useDashboard();
  const [localCategoriaFilter, setLocalCategoriaFilter] = useState<CategoriaVeiculo | 'Todos'>('Todos');

  // Dados agregados por categoria
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {
      'Caminhão': 0,
      'Truck': 0,
      'Carreta': 0,
      'Bitrem': 0,
      'Rodotrem': 0,
    };

    filteredChecklists.forEach((item) => {
      if (localCategoriaFilter === 'Todos' || item.categoria === localCategoriaFilter) {
        if (counts[item.categoria] !== undefined) {
          counts[item.categoria]++;
        }
      }
    });

    const categories = Object.keys(counts);
    const values = Object.values(counts);

    return { categories, values };
  }, [filteredChecklists, localCategoriaFilter]);

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
        right: '6%',
        bottom: '3%',
        top: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } },
      },
      yAxis: {
        type: 'category',
        data: chartData.categories,
        axisLabel: { color: textColor, fontWeight: 500 },
        axisLine: { lineStyle: { color: borderColor } },
      },
      series: [
        {
          name: 'Checklists',
          type: 'bar',
          data: chartData.values,
          barWidth: '50%',
          itemStyle: {
            borderRadius: [0, 8, 8, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#0F8B5F' },
                { offset: 1, color: '#2EB67D' },
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

  const onChartClick = (params: any) => {
    if (params && params.name) {
      toggleCategoriaFilter(params.name as CategoriaVeiculo);
    }
  };

  const headerAction = (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={localCategoriaFilter}
        onChange={(e) => setLocalCategoriaFilter(e.target.value as any)}
        sx={{ borderRadius: '10px', fontSize: '0.8rem', height: 32 }}
      >
        {CATEGORIAS_LIST.map((cat) => (
          <MenuItem key={cat} value={cat} sx={{ fontSize: '0.8rem' }}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <ChartCardWrapper
      title="Checklist por Categoria"
      description="Distribuição por tipo de veículo"
      headerAction={headerAction}
      isLoading={isRefreshing}
    >
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        onEvents={{ click: onChartClick }}
      />
    </ChartCardWrapper>
  );
};
