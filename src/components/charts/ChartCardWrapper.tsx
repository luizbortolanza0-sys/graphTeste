import React from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Skeleton,
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { useColorMode } from '../../context/ThemeContext';

interface ChartCardWrapperProps {
  title: string;
  description?: string;
  headerAction?: React.ReactNode;
  isLoading?: boolean;
  onRefresh?: () => void;
  children: React.ReactNode;
}

export const ChartCardWrapper: React.FC<ChartCardWrapperProps> = ({
  title,
  description,
  headerAction,
  isLoading = false,
  onRefresh,
  children,
}) => {
  const { mode } = useColorMode();

  const chartBody = (
    <Box sx={{ flexGrow: 1, position: 'relative', minHeight: 280 }}>
      {isLoading ? (
        <Box sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: '12px' }} />
        </Box>
      ) : (
        children
      )}
    </Box>
  );

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderRadius: '20px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: mode === 'dark' ? 'background.paper' : '#FFFFFF',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: mode === 'dark'
            ? '0 2px 8px rgba(0, 0, 0, 0.2)'
            : '0 2px 8px rgba(0, 0, 0, 0.03)',
          transition: 'box-shadow 0.25s ease',
          '&:hover': {
            boxShadow: mode === 'dark'
              ? '0 6px 20px rgba(0, 0, 0, 0.3)'
              : '0 6px 20px rgba(0, 0, 0, 0.06)',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.5,
            gap: 1,
            minHeight: 36,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '-0.2px', lineHeight: 1.3 }}
            >
              {title}
            </Typography>
            {description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 400, fontSize: '0.73rem', lineHeight: 1.2 }}
              >
                {description}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
            {headerAction}

            {onRefresh && (
              <Tooltip title="Atualizar">
                <IconButton size="small" onClick={onRefresh} sx={{ color: 'text.secondary', width: 30, height: 30 }}>
                  <RefreshRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        {chartBody}
      </Paper>
    </>
  );
};
