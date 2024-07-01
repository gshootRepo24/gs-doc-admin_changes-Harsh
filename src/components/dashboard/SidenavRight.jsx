import React, { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
import TopAppBarRight from './TopAppbarRight';
import Dashboard from './Dashboard/Dashboard';
import SideNavSearch from './SideNavSearch/SideNavSearch';
import Trash from './Trash/Trash';
import Settings from './Settings/Settings';
import Repository from './Repository/Repository';
import RepositoryHome from './Repository/RepositoryHome';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    position: 'relative',
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function SidenavRight() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard'); // Initial page
  
  // Use useTranslation hook to fetch translations
  const { t } = useTranslation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopAppBarRight open={open} handleDrawerOpen={handleDrawerOpen} />
      <Main open={open}>
        <DrawerHeader />
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'repository' && <RepositoryHome />}
        {currentPage === 'search' && <SideNavSearch />}
        {currentPage === 'trash' && <Trash />}
        {currentPage === 'settings' && <Settings />}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { key: 'dashboard', icon: <DashboardIcon />, page: 'dashboard' },
            { key: 'repository', icon: <RepositoryIcon />, page: 'repository' },
            { key: 'search', icon: <SearchIcon />, page: 'search' },
            { key: 'trash', icon: <TrashIcon />, page: 'trash' },
            { key: 'settings', icon: <SettingsIcon />, page: 'settings' }
          ].map((item, index) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton onClick={() => setCurrentPage(item.page)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                {/* Fetch translations dynamically */}
                <ListItemText primary={t(`${item.key}Label`)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
