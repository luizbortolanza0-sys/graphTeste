import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

const baseOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Gabarito", -apple-system, BlinkMacSystemFont, "Segoe UI",         Roboto, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 16,
  },
};

export const darkTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#2EB67D',
      light: '#5AD39D',
      dark: '#0F8B5F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0F8B5F',
      light: '#2EB67D',
      dark: '#0A6344',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#34C759',
      light: '#5DD47E',
      dark: '#248A3D',
    },
    warning: {
      main: '#FFB020',
      light: '#FFC452',
      dark: '#B27B16',
    },
    error: {
      main: '#F04438',
      light: '#F46A60',
      dark: '#B83229',
    },
    background: {
      default: '#0F1117',
      paper: '#1A1D27',
    },
    text: {
      primary: '#E5E7EB',
      secondary: '#9CA3AF',
    },
    divider: '#2D3140',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0F1117',
          color: '#E5E7EB',
          fontFamily: '"Gabarito", sans-serif',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#374151',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          backgroundImage: 'none',
          backgroundColor: '#1A1D27',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.2)',
          border: '1px solid #2D3140',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '8px 18px',
          fontSize: '0.875rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(46, 182, 125, 0.25)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          fontWeight: 500,
        },
      },
    },
  },
});
