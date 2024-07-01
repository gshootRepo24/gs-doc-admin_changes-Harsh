import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { lighten } from 'polished';
import './TopAppBar.scss'
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),

  backgroundColor: '#191970',
}));

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 10,
  borderRadius: 20,
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: lighten(0.2, '#191970'),
  },
});

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: '1em',
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function TopAppBar({ open, handleDrawerOpen }) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  };

  return (
    <AppBar position="fixed" open={open} className='appBar'>
      <Toolbar >
        <IconButton 
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" className='appBar'>
          {t('homeLabel')}
        </Typography>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            placeholder={t('searchLabel')}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </SearchContainer>
      </Toolbar>
    </AppBar>
  );
}
