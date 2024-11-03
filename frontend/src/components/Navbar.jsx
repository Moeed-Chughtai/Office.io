import { React, useState, useEffect } from 'react';
import '../css/Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';

const ResponsiveAppBar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setActiveItem(location.pathname)
  }, [location]);

  return (
    <>
      <Logo />
      <nav>
        <Link to='/' className={`navbar-item ${activeItem === '/' ? 'active' : ''}`}>Home</Link>
        <Link to='/schedule' className={`navbar-item ${activeItem === '/schedule' ? 'active' : ''}`}>Schedule</Link>
        <Link to='/messages' className={`navbar-item ${activeItem === '/messages' ? 'active' : ''}`}>Messages</Link>
        <Link to='/' className={`navbar-item ${activeItem === '/jjk' ? 'active' : ''}`}>Contact</Link>
        <Link to='/login' className={`navbar-item ${activeItem === '/login' ? 'active' : ''}`}>Sign Up</Link>
        <div class="animation"></div>
      </nav>
    </>
  );
}
export default ResponsiveAppBar;
