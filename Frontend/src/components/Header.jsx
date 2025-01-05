import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    
  return (
<nav className="bg-blue-500 p-4">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/add" className="text-white hover:text-gray-300">Add Campaign</Link>
        </li>
        <li>
          <Link to="/view" className="text-white hover:text-gray-300">View Campaigns</Link>
        </li>
        <li>
          <Link to="/withdraw" className="text-white hover:text-gray-300">Withdraw Funds</Link>
        </li>
        <li>
          <Link to="/allDonations" className="text-white hover:text-gray-300">All Donations</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header