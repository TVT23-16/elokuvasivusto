import React, { useState,} from 'react';
import { Link, useLinkClickHandler } from 'react-router-dom';
import './DropdownMenu.css';
import Myprofile from '../pages/Myprofile';


const DropdownMenu = ({ user }) => {
  const [isOpen, setisOpen] = useState(false);
  const toggleDropdown =()=> {setisOpen(!isOpen)}
  return (

       <div id="profile.png">
       
      <button className="dropdown-toggle" onClick={toggleDropdown} >
      <img src='./profile.png' alt="profilepic" ></img>
      </button>
      
      {isOpen && (
        <ul className="dropdown-menu">
         
          <li>
            <Link to="/myprofile/delete">Delete account</Link>

          </li>
          <li>
            <Link to="/Logout">Logout</Link>
          <li>
          </li>
          <Link to="/myprofile">My profile</Link>
          </li>
          
        </ul>
      )}
    </div>
)
};

export default DropdownMenu;