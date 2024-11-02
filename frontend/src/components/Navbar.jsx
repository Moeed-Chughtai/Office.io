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
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../assets/atom-logo.CV42YAKh.svg';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {

  return (
    <nav>
      <Link to='/' className='navbar-item'>Home</Link>
      <Link to='/schedule' className='navbar-item'>Schedule</Link>
      <Link to='/' className='navbar-item'>Message</Link>
      <Link to='/' className='navbar-item'>Contact</Link>
      <Link to='/' className='navbar-item'>Sign Up</Link>
      <div class="animation start-home"></div>
    </nav>
  );
}
export default ResponsiveAppBar;
