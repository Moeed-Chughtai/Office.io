import * as React from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {

  return (
    <>
      <Logo />
      <nav>
        <Link to='/' className='navbar-item'>Home</Link>
        <Link to='/schedule' className='navbar-item'>Schedule</Link>
        <Link to='/messages' className='navbar-item'>Messages</Link>
        <Link to='/' className='navbar-item'>Contact</Link>
        <Link to='/login' className='navbar-item'>Sign In</Link>
        <div class="animation start-home"></div>
      </nav>
    </>
  );
}
export default ResponsiveAppBar;
