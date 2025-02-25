import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Menu, MenuItem } from '@mui/material';
import { AppBar, Toolbar, Typography, InputBase, Button, Avatar, IconButton, Popover } from '@mui/material';
import Meta from './Meta';
import { useUser } from '../contexts/UserContext';


const Navbar = () => {
  // const { id, username } = useUser();
  const username = localStorage.getItem('username')
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);

  const handleProfileOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setAvatarSrc("");  // or set to a default image if you have one
  };
  const [avatarSrc, setAvatarSrc] = React.useState("/static/images/avatar/1.jpg");
  const fileInputRef = React.useRef(null);


  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          AICTE
        </Typography>
        {/* <div sx={{ position: 'relative', ml: { xs: 1, sm: 3 } }}>
          <div sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <SearchIcon />
          </div>
          <InputBase
            sx={{ pl: '40px', transition: '.3s', '&:hover': { width: '210px', background: 'rgba(255,255,255,0.1)' }, width: '170px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </div> */}

        <Button color="inherit" sx={{ ml: 1 }}>Meetings</Button>
        <Avatar
          alt="Profile Picture"
          src="/static/images/avatar/1.jpg"
          sx={{ ml: 2, cursor: 'pointer' }}
          onClick={handleProfileOpen}
        />
        <Popover
          open={Boolean(profileAnchorEl)}
          anchorEl={profileAnchorEl}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              alt="Profile Picture"
              src={avatarSrc}
              sx={{ ml: 2, cursor: 'pointer' }}
              onClick={handleProfileOpen}
            />

            <Button color="primary" onClick={() => fileInputRef.current.click()}>
              Change Profile Picture
            </Button>
           

            <Button
              color="error"
              onClick={handleImageRemove}
            >
              Remove Profile Picture
            </Button>

          </div>
        </Popover>

        <Typography
          variant="subtitle1"
          sx={{ ml: 1, cursor: 'pointer' }}
          onClick={handleMenuOpen} // Add onClick handler here
        >
          {username}
        </Typography>
        <Meta/>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Help</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />


      </Toolbar>
    </AppBar>
  );
};

export default Navbar;