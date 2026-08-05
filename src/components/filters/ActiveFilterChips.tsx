import React from 'react';
import { Box, Chip, Button, Typography } from '@mui/material';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { useDashboard } from '../../context/DashboardContext';

export const ActiveFilterChips: React.FC = () => {
  const { activeChips, clearFilter, clearAllFilters } = useDashboard();

  if (activeChips.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap',
        py: 0.5,
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mr: 0.5 }}>
        Filtros ativos:
      </Typography>

      {activeChips.map((chip) => (
        <Chip
          key={chip.key}
          label={`${chip.label}: ${chip.valueDisplay}`}
          onDelete={() => clearFilter(chip.key)}
          size="small"
          color="primary"
          variant="outlined"
          sx={{
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.75rem',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(46, 182, 125, 0.12)' : 'rgba(15, 139, 95, 0.06)',
            borderColor: 'primary.main',
            '& .MuiChip-deleteIcon': {
              color: 'primary.main',
              '&:hover': {
                color: 'error.main',
              },
            },
          }}
        />
      ))}

      {activeChips.length >= 1 && (
        <Button
          size="small"
          onClick={clearAllFilters}
          startIcon={<FilterAltOffRoundedIcon fontSize="small" />}
          sx={{
            fontSize: '0.75rem',
            textTransform: 'none',
            color: 'error.main',
            py: 0.2,
            px: 1,
            minWidth: 0,
            fontWeight: 600,
            '&:hover': {
              bgcolor: 'rgba(240, 68, 56, 0.08)',
            },
          }}
        >
          Limpar Todos
        </Button>
      )}
    </Box>
  );
};
