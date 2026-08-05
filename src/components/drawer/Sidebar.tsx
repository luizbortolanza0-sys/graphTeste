import React, { useState } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useColorMode } from '../../context/ThemeContext';

export const DRAWER_WIDTH = 240;
export const MINI_DRAWER_WIDTH = 76;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  { title: 'Dashboard', icon: <DashboardRoundedIcon />, active: true },
  { title: 'Relatórios', icon: <DescriptionRoundedIcon /> },

];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { mode, toggleTheme } = useColorMode();

  const isMini = !isMobile && !isExpanded;

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: mode === 'dark' ? '#13151D' : '#FFFFFF',
        color: 'text.primary',
        transition: theme.transitions.create(['width', 'background-color'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMini ? 'center' : 'space-between',
          px: isMini ? 1 : 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0F8B5F 0%, #2EB67D 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(15, 139, 95, 0.3)',
            }}
          >
            <DashboardRoundedIcon />
          </Box>
          {!isMini && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.5px',
                background: mode === 'dark'
                  ? 'linear-gradient(180deg, #FFFFFF 0%, #E5E7EB 100%)'
                  : 'linear-gradient(180deg, #1F2937 0%, #374151 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dashboard
            </Typography>
          )}
        </Box>

        
      </Box>

      {/* Menu List */}
      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        {MENU_ITEMS.map((item) => {
          const isActive = item.active;
          return (
            <ListItem key={item.title} disablePadding sx={{ mb: 0.8 }}>
              <Tooltip title={isMini ? item.title : ''} placement="right" arrow>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    borderRadius: '14px',
                    px: isMini ? 1.5 : 2,
                    justifyContent: isMini ? 'center' : 'initial',
                    bgcolor: isActive
                      ? mode === 'dark' ? 'rgba(46, 182, 125, 0.15)' : 'rgba(15, 139, 95, 0.08)'
                      : 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    position: 'relative',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: isActive
                        ? mode === 'dark' ? 'rgba(46, 182, 125, 0.25)' : 'rgba(15, 139, 95, 0.14)'
                        : mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                      transform: 'translateX(3px)',
                    },
                  }}
                >
                  {/* Green active indicator line */}
                  {isActive && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: '15%',
                        bottom: '15%',
                        width: '4px',
                        borderRadius: '0 4px 4px 0',
                        bgcolor: 'primary.main',
                        boxShadow: '0 0 8px #2EB67D',
                      }}
                    />
                  )}

                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isMini ? 0 : 2,
                      justifyContent: 'center',
                      color: isActive ? 'primary.main' : 'text.secondary',
                      transition: 'color 0.2s',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {!isMini && (
                    <ListItemText
                      primary={item.title}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: '0.9rem',
                            fontWeight: isActive ? 600 : 500,
                          },
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* Theme Toggle Footer */}
      <Box sx={{ p: 2, display: 'flex', 
        flexDirection: 'column',    
        justifyContent: isMini ? 'center' : 'space-between',
        alignItems: 'center' }}>
        {!isMobile && (
          <IconButton onClick={handleToggleExpand} size="small" sx={{ color: 'text.secondary' }}>
            {isExpanded ? <ChevronLeftRoundedIcon /> : <ChevronRightRoundedIcon />}
          </IconButton>
        )}
        
        {!isMini && (
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            Modo {mode === 'dark' ? 'Escuro' : 'Claro'}
          </Typography>
        )}
        <Tooltip title={`Alternar para tema ${mode === 'dark' ? 'claro' : 'escuro'}`} placement="right">
          <IconButton
            onClick={toggleTheme}
            sx={{
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              '&:hover': {
                bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
              }
            }}
          >
            {mode === 'dark' ? <LightModeRoundedIcon sx={{ color: '#FFC452' }} /> : <DarkModeRoundedIcon sx={{ color: '#4B5563' }} />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop & Tablet Mini/Expanded Drawer */
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            width: isMini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH,
            flexShrink: 0,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            '& .MuiDrawer-paper': {
              width: isMini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};
