import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { ChartCardWrapper } from './ChartCardWrapper';
import { useDashboard } from '../../context/DashboardContext';
import { useColorMode } from '../../context/ThemeContext';
import type { NomePeriferico } from '../../types/checklist';

const PERIFERICOS_ORDER: NomePeriferico[] = [
  'Sirene',
  'Trava do Baú',
  'Sensor de Porta',
  'Desengate de Carreta',
  'Bloqueio',
  'Iluminação',
];

export const RejectedPeripheralsChart: React.FC = () => {
  const { mode } = useColorMode();
  const { filteredChecklists, isRefreshing } = useDashboard();

  const chartData = useMemo(() => {
    const counts: Record<NomePeriferico, number> = {
      'Sirene': 0,
      'Trava do Baú': 0,
      'Sensor de Porta': 0,
      'Desengate de Carreta': 0,
      'Bloqueio': 0,
      'Iluminação': 0,
    };

    filteredChecklists.forEach((item) => {
      if (Array.isArray(item.perifericos)) {
        item.perifericos.forEach((p) => {
          if (p.status === 'Reprovado' && counts[p.nome] !== undefined) {
            counts[p.nome]++;
          }
        });
      }
    });

    return {
      names: PERIFERICOS_ORDER,
      values: PERIFERICOS_ORDER.map((name) => counts[name]),
    };
  }, [filteredChecklists]);

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
        valueFormatter: (value: number) => `${value} falhas registradas`,
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
        data: chartData.names,
        axisLabel: { color: textColor, fontWeight: 500 },
        axisLine: { lineStyle: { color: borderColor } },
      },
      series: [
        {
          name: 'Reprovações',
          type: 'bar',
          data: chartData.values,
          barWidth: '45%',
          itemStyle: {
            borderRadius: [0, 8, 8, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#F04438' },
                { offset: 1, color: '#FFB020' },
              ],
            },
          },
          emphasis: {
            itemStyle: {
              color: '#F46A60',
            },
          },
        },
      ],
    };
  }, [chartData, mode]);

  return (
    <ChartCardWrapper
      title="Periféricos Reprovados"
      description="Incidência de reprovações por componente"
      isLoading={isRefreshing}
    >
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </ChartCardWrapper>
  );
};
