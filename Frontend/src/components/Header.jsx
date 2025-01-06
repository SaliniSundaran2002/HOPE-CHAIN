import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo.png';

const Header = () => {
  return (
    <nav className="p-4">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="logo" className="w-12 bg-blue-500 rounded-full" />
          <h1 className="text-2xl font-bold font-SourGummy text-blue-500">HOPE CHAIN</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8 font-SourGummy">
          <li>
            <Link to="/home" className="text-blue-500 hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add" className="text-blue-500 hover:text-gray-300">
              Add Campaign
            </Link>
          </li>
          <li>
            <Link to="/view" className="text-blue-500 hover:text-gray-300">
              View Campaigns
            </Link>
          </li>
          <li>
            <Link to="/withdraw" className="text-blue-500 hover:text-gray-300">
              Withdraw Funds
            </Link>
          </li>
          <li>
            <Link to="/allDonations" className="text-blue-500 hover:text-gray-300">
              All Donations
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
