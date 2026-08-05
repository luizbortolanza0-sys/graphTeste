import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { ChartCardWrapper } from './ChartCardWrapper';
import { useDashboard } from '../../context/DashboardContext';
import { useColorMode } from '../../context/ThemeContext';
import { Filiais  } from '../../mock/filiaisMock';

export const BrasilMapChart: React.FC = () => {
  const { mode } = useColorMode();

  const {
    filteredChecklists,
    isRefreshing,
    toggleFilialFilter,
  } = useDashboard();

  const chartData = useMemo(() => {
    return Filiais.map((filial) => {
      const total = filteredChecklists.filter(
        (item) => item.filial === filial.nome
      ).length;

      return {
        ...filial,
        value: [
          filial.longitude,
          filial.latitude,
          total,
        ],
      };
    });
  }, [filteredChecklists]);

  const option = useMemo(() => {
    const borderColor = mode === 'dark' ? '#2D3140' : '#D1D5DB';
    const areaColor = mode === 'dark' ? '#1F2937' : '#F8FAFC';
    const textColor = mode === 'dark' ? '#E5E7EB' : '#111827';

    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: mode === 'dark' ? '#1A1D27' : '#FFFFFF',
        borderColor,
        textStyle: {
          color: textColor,
          fontFamily: 'Gabarito',
        },
        formatter: (params: any) => {
          return `
            <strong>${params.data.nome}</strong><br/>
            Checklists: <b>${params.data.value[2]}</b>
          `;
        },
      },

      geo: {
        map: 'Brasil',
        roam: true,
        zoom: 1.15,

        itemStyle: {
          areaColor,
          borderColor,
          borderWidth: 0.8,
        },

        emphasis: {
          itemStyle: {
            areaColor: '#3B82F6',
          },
        },

        label: {
          show: false,
        },
      },

      series: [
        {
          name: 'Filiais',
          type: 'scatter',
          coordinateSystem: 'geo',

          data: chartData,

          symbol: 'pin',

          symbolSize: (value: any) => {
            const total = value[2];

            if (total === 0) return 20;

            return Math.min(38, 20 + total);
          },

          itemStyle: {
            color: '#2563EB',
            borderColor: '#FFFFFF',
            borderWidth: 2,
          },

          emphasis: {
            scale: true,
            itemStyle: {
              color: '#60A5FA',
              shadowBlur: 15,
              shadowColor: 'rgba(0,0,0,.25)',
            },
          },
        },
      ],
    };
  }, [chartData, mode]);

  const onChartClick = (params: any) => {
    if (!params?.data?.nome) return;

    toggleFilialFilter(params.data.nome);
  };

  return (
    <ChartCardWrapper
      title="Mapa de Filiais"
      description="Distribuição dos checklists por cidade"
      isLoading={isRefreshing}
    >
      <ReactECharts
        option={option}
        style={{
          height: '100%',
          width: '100%',
        }}
        onEvents={{
          click: onChartClick,
        }}
      />
    </ChartCardWrapper>
  );
};