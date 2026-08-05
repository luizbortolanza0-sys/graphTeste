import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { ChartCardWrapper } from './ChartCardWrapper';
import { useDashboard } from '../../context/DashboardContext';
import { useColorMode } from '../../context/ThemeContext';
import type { StatusChecklist } from '../../types/checklist';

const STATUS_COLORS: Record<StatusChecklist, string> = {
  'Aprovado': '#34C759',
  'Reprovado': '#F04438',
  'Pendente': '#FFB020',
  'Forçado': '#FFC452',
  'Sem análise': '#3B82F6',
};

export const StatusPieChart: React.FC = () => {
  const { mode } = useColorMode();
  const { filteredChecklists, isRefreshing, toggleStatusFilter } = useDashboard();

  const chartData = useMemo(() => {
    const counts: Record<StatusChecklist, number> = {
      'Aprovado': 0,
      'Reprovado': 0,
      'Pendente': 0,
      'Forçado': 0,
      'Sem análise': 0,
    };

    filteredChecklists.forEach((item) => {
      if (counts[item.status] !== undefined) {
        counts[item.status]++;
      }
    });

    const totalCount = filteredChecklists.length;

    const seriesData = (Object.keys(counts) as StatusChecklist[]).map((status) => ({
      name: status,
      value: counts[status],
      itemStyle: { color: STATUS_COLORS[status] },
    }));

    return { seriesData, totalCount };
  }, [filteredChecklists]);

  const option = useMemo(() => {
    const textColor = mode === 'dark' ? '#E5E7EB' : '#1F2937';
    const subTextColor = mode === 'dark' ? '#9CA3AF' : '#6B7280';

    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: mode === 'dark' ? '#1A1D27' : '#FFFFFF',
        borderColor: mode === 'dark' ? '#2D3140' : '#E5E7EB',
        textStyle: { color: textColor, fontSize: 12, fontFamily: 'Gabarito', },
        formatter: (params: any) => {
          const percent = params.percent ? params.percent.toFixed(1) : 0;
          return `<strong style= "font-weight: 500;">${params.name}</strong><br/>Quantidade: <b>${params.value}</b> (${percent}%)`;
        },
      },
      legend: {
        orient: 'vertical',
        right: '4%',
        top: 'center',
        textStyle: { color: subTextColor, fontSize: 11, fontWeight: 500, fontFamily: 'Gabarito' },
        itemGap: 10,
        itemWidth: 10,
        itemHeight: 10,
        icon: 'circle',
      },
      title: {
        text: chartData.totalCount.toLocaleString('pt-BR'),
        subtext: 'Total',
        left: '30%',
        top: '40%',
        textAlign: 'center',
        textStyle: {
          color: textColor,
          fontSize: 28,
          fontWeight: 'bold',
          fontFamily: 'Gabarito',
        },
        subtextStyle: {
          color: subTextColor,
          fontSize: 11,
          fontWeight: 500,
          fontFamily: 'Gabarito',
        },
      },
      series: [
        {
          name: 'Status Geral',
          type: 'pie',
          radius: ['52%', '78%'],
          center: ['32%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: mode === 'dark' ? '#1A1D27' : '#FFFFFF',
            borderWidth: 3,
          },
          label: { show: false },
          emphasis: {
            label: { show: false },
            itemStyle: {
              shadowBlur: 12,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.25)',
            },
          },
          data: chartData.seriesData,
        },
      ],
    };
  }, [chartData, mode]);

  const onChartClick = (params: any) => {
    if (params && params.name) {
      toggleStatusFilter(params.name as StatusChecklist);
    }
  };

  return (
    <ChartCardWrapper
      title="Status Geral"
      description="Proporção dos status com total no centro"
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
