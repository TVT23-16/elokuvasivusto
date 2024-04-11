import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/profile/settings">Delete account</Link>
          </li>
          <li>
            <Link to="/profile/logout">Logout</Link>
          </li>
          <li>
            <Link to="/myprofile/">My Profile</Link>
          </li>
          {/* Lisää vaihtoehtoja tarpeen mukaan */}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;