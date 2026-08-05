import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { useDashboard } from '../../context/DashboardContext';
import { useColorMode } from '../../context/ThemeContext';

interface DashboardHeaderProps {
  onMobileDrawerToggle: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onMobileDrawerToggle,
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { mode } = useColorMode();
  const { filters, setFilter, triggerRefresh, isRefreshing } = useDashboard();

  return (
    <Box
      component="header"
      sx={{
        px: { xs: 2, sm: 3, md: 3.5 },
        py: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
        gap: { xs: 1.5, md: 2 },
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: mode === 'dark' ? 'rgba(15, 17, 23, 0.92)' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}
    >
      {/* Left: Title + Mobile Menu Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
        {isTablet && (
          <IconButton
            onClick={onMobileDrawerToggle}
            edge="start"
            size="small"
            sx={{
              color: 'text.primary',
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              borderRadius: '10px',
            }}
          >
            <MenuRoundedIcon fontSize="small" />
          </IconButton>
        )}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.3px',
              lineHeight: 1.25,
              color: 'text.primary',
              fontSize: { xs: '1rem', sm: '1.15rem' },
            }}
          >
            Dashboard Logístico
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 400, fontSize: '0.78rem', lineHeight: 1.3 }}
          >
            Monitoramento em tempo real dos Checklists.
          </Typography>
        </Box>
      </Box>

      {/* Right Side Actions */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'nowrap',
          justifyContent: { xs: 'stretch', md: 'flex-end' },
        }}
      >
        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
            borderRadius: '12px',
            px: 1.5,
            height: 38,
            border: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
            flex: { xs: 1, md: 'none' },
            width: { md: 240 },
            transition: 'all 0.2s ease',
            '&:focus-within': {
              borderColor: 'primary.main',
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,1)',
              boxShadow: '0 0 0 3px rgba(15, 139, 95, 0.1)',
            },
          }}
        >
          <SearchRoundedIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />
          <InputBase
            placeholder="Pesquisar por placa, motorista..."
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            sx={{
              fontSize: '0.8rem',
              color: 'text.primary',
              width: '100%',
              '& input::placeholder': {
                color: 'text.secondary',
                opacity: 0.7,
              },
            }}
          />
        </Box>

        {/* Refresh */}
        <Tooltip title="Atualizar dados">
          <IconButton
            onClick={triggerRefresh}
            disabled={isRefreshing}
            size="small"
            sx={{
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              borderRadius: '10px',
              width: 38,
              height: 38,
              border: '1px solid',
              borderColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              animation: isRefreshing ? 'spin 0.6s linear infinite' : 'none',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          >
            <RefreshRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>



        {/* Avatar */}
        <Avatar
          alt="Operador"
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'primary.main',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 0 0 2px transparent',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: (t) => `0 0 0 2px ${t.palette.primary.main}`,
            },
          }}
        >
          OP
        </Avatar>
      </Box>
    </Box>
  );
};
