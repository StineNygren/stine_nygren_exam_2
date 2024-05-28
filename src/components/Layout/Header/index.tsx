import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isManager } from '../../../services/localeStorage/localeStorage';

function Header() {
  
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('avatar') || 'defaultAvatar.png');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setAvatarUrl('defaultAvatar.png');
    navigate('/');
  };  

  const pages = ['home'];
  const settings = isLoggedIn 
  ? ['profile', ...(isManager ? ['create venue'] : []), 'logout'] 
  : ['login'];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    
    <AppBar position="static"     sx={{
      height: '60px',
  
  }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none', 
                color: 'inherit' 
              },
            }}
          >
            Holidaze
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Link           component={NavLink} 
            to={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'none', // Removes the underline on hover
                color: 'inherit' // Keeps the color the same on hover
              },
            }}
          >
                  <Typography sx={{color: "black" }}  textAlign="center">{page}</Typography>
                </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none', 
                color: 'inherit'
              },
            }}
          >
            Holidaze
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
            <Button
            component={NavLink} 
            to={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`}
            key={page}
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: 'black',
              display: 'block',
              '&:hover': {
                backgroundColor: 'transparent', // Removes the background color change on hover
                color: 'black' // Keeps the color the same on hover
              },
            }}
          >
            {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={avatarUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
  {settings.map((setting) => (
    <MenuItem key={setting} onClick={handleCloseUserMenu}>
      {setting === "logout" ? (
        <Typography
          sx={{ color: "black" }}
          textAlign="center"
          onClick={handleLogout}
        >
          {setting}
        </Typography>
      ) : (
        <Link component={NavLink} to={`/${setting.toLowerCase()}`}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          '&:hover': {
            textDecoration: 'none', 
            color: 'inherit' 
          },
        }}
        >
          <Typography sx={{ color: "black" }} textAlign="center">
            {setting}
          </Typography>
        </Link>
      )}
    </MenuItem>
  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
