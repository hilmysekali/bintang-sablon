import * as React from 'react';
import {
  styled,
  AppBar as MuiAppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import Logo from './Logo';
import Jam from './Jam';
import Profile from './Profile';
import { useSelector } from 'react-redux';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CustomAppBar = ({ setOpen }) => {
  const { drawerOpen, drawerWidth } = useSelector(state => state.theme);

  // Button Toggle
  const MenuButton = () => {
    if (!drawerOpen) {
      return (
        <>
          <IconButton
            color="inherit"
            aria-label="Open Menu"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </>
      )
    } else {
      return (
        <>
          <IconButton
            color="inherit"
            aria-label="Close Menu"
            onClick={() => setOpen(false)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </>
      )
    }
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} drawerWidth={drawerWidth}>

      {/* Container */}
      <Container maxWidth="xl">

        {/* Toolbar Bungkus */}
        <Toolbar disableGutters>

          {/* Content AppBar */}
          <MenuButton />
          <Logo />
          <Jam />
          <Box sx={{ flexGrow: 0 }}>
            <Profile />
          </Box>

        </Toolbar>
        
      </Container>
      
    </AppBar>
  );
}

export default CustomAppBar;