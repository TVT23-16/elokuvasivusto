import { Link } from 'react-router-dom'
import './Navbar.css'
import React from 'react'
import DropdownMenu from './DropdownMenu';


const Navbar = ({ user }) => {
  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/series">Series</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
          
          </li>
          <li>
            {user === null && <Link to="/login">Login</Link>}
            {user && <Link to="/logout">Logout</Link>}
          </li>
          <DropdownMenu user={user} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;