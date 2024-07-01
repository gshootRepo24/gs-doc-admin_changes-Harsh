import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RepositoryIcon from '@mui/icons-material/AccountTree';
import SearchIcon from '@mui/icons-material/Search';
import TrashIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import TopAppBar from './TopAppBar';
import Dashboard from './Dashboard/Dashboard';
import SideNavSearch from './SideNavSearch/SideNavSearch';
import Trash from './Trash/Trash';
import Settings from './Settings/Settings';
import Repository from './Repository/Repository';

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    display:'inline',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidenav() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const [currentPage, setCurrentPage]=React.useState('dashboard')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (page) => {
    setCurrentPage(page);
  };

  const iconMapping = {
    'dashboard': <DashboardIcon />,
    'repository': <RepositoryIcon />,
    'search': <SearchIcon />,
    'trash': <TrashIcon />,
    'settings': <SettingsIcon />
  };

  const menuItems = ['dashboard', 'repository', 'search', 'trash', 'settings'];

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <TopAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem 
            key={text} 
            disablePadding 
            sx={{ display: 'block' }}
            onClick={() => handleItemClick(text)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {iconMapping[text]}
                </ListItemIcon>
                <ListItemText primary={t(`${text}Label`)} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main"  sx={{ flexGrow: 1, p: 1  }}>
        <DrawerHeader />
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'repository' && <Repository />}
        {currentPage === 'search' && <SideNavSearch />}
        {currentPage === 'trash' && <Trash />}
        {currentPage === 'settings' && <Settings />}
      </Box>
    </Box>
  );
}
