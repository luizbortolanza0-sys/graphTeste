import React from 'react';
import { Box, Paper, Typography, Skeleton, Chip } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { useColorMode } from '../../context/ThemeContext';

export interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  gradientColors: [string, string];
  changePercentage?: number;
  isPositive?: boolean;
  isMainHighlight?: boolean;
  isLoading?: boolean;
  isActiveFilter?: boolean;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
  gradientColors,
  changePercentage = 0,
  isPositive = true,
  isMainHighlight = false,
  isLoading = false,
  isActiveFilter = false,
  onClick,
}) => {
  const { mode } = useColorMode();

  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: '20px',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        minHeight: 170,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: mode === 'dark' ? 'background.paper' : '#FFFFFF',
        border: '1px solid',
        borderColor: isActiveFilter 
          ? 'primary.main' 
          : isMainHighlight 
            ? mode === 'dark' ? 'rgba(46, 182, 125, 0.35)' : 'rgba(15, 139, 95, 0.2)' 
            : 'divider',
        boxShadow: isActiveFilter
          ? '0 0 0 2px rgba(46, 182, 125, 0.2), 0 8px 24px rgba(0,0,0,0.08)'
          : isMainHighlight
            ? mode === 'dark'
              ? '0 8px 32px rgba(15, 139, 95, 0.15)'
              : '0 8px 32px rgba(15, 139, 95, 0.08)'
            : mode === 'dark'
              ? '0 2px 8px rgba(0, 0, 0, 0.2)'
              : '0 2px 8px rgba(0, 0, 0, 0.03)',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: mode === 'dark'
            ? '0 12px 32px rgba(0, 0, 0, 0.25)'
            : '0 12px 32px rgba(0, 0, 0, 0.07)',
          borderColor: 'primary.main',
        },
      }}
    >
      {/* Background Subtle Gradient Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${gradientColors[0]}12 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Skeleton variant="circular" width={44} height={44} />
          <Skeleton variant="text" width="50%" height={16} />
          <Skeleton variant="text" width="70%" height={40} />
          <Skeleton variant="text" width="60%" height={14} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, height: '100%', justifyContent: 'space-between' }}>
          {/* Header Row: Icon + Change Badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: `0 4px 12px ${gradientColors[0]}30`,
                '& svg': { fontSize: 22 },
              }}
            >
              {icon}
            </Box>

            {changePercentage !== undefined && (
              <Chip
                size="small"
                icon={isPositive ? <TrendingUpRoundedIcon /> : <TrendingDownRoundedIcon />}
                label={`${isPositive ? '+' : '-'}${changePercentage}%`}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 24,
                  bgcolor: isPositive 
                    ? mode === 'dark' ? 'rgba(52, 199, 89, 0.12)' : 'rgba(52, 199, 89, 0.08)' 
                    : mode === 'dark' ? 'rgba(240, 68, 56, 0.12)' : 'rgba(240, 68, 56, 0.08)',
                  color: isPositive ? 'success.main' : 'error.main',
                  border: 'none',
                  '& .MuiChip-icon': {
                    color: 'inherit',
                    fontSize: 14,
                    ml: 0.5,
                  },
                }}
              />
            )}
          </Box>

          {/* Middle: Value */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: 'text.primary',
                lineHeight: 1.1,
                fontFeatureSettings: '"tnum"',
                fontSize: isMainHighlight ? '2.2rem' : '1.9rem',
                mb: 0.3,
              }}
            >
              {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
            </Typography>
          </Box>

          {/* Bottom: Title + Description */}
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                color: 'text.secondary',
                letterSpacing: '0.3px',
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                lineHeight: 1.4,
                mb: 0.2,
              }}
            >
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400, fontSize: '0.72rem' }}>
              {description}
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};
