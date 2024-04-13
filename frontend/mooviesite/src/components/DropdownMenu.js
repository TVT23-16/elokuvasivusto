import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';

const DropdownMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown} >
        photo
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="/profiili/asetukset">Delete account</Link>
          </li>
          <li>
            <Link to="/profiili/uloskirjautuminen">Logout</Link>
          <li>
            </li>
          <Link to="/myprofile">My profile</Link>
          </li>
          {/* Lisää vaihtoehtoja tarpeen mukaan */}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;