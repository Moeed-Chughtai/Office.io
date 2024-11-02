// src/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or Title */}
        <div className="text-white text-xl font-semibold">
          MyApp
        </div>

        {/* Navbar Links */}
        <div className="flex space-x-6">
          <a href="#" className="text-white hover:text-blue-200 transition-colors">
            Scheduler
          </a>
          <a href="#" className="text-white hover:text-blue-200 transition-colors">
            Messages
          </a>
          <a href="#" className="text-white hover:text-blue-200 transition-colors">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
