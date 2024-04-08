import { Link } from 'react-router-dom'
import './Navbar.css'
import React from 'react'


export default function Navbar({user}) {
  return (
    
    <nav>
      <div>
      <ul>
        <li>
          <Link to ="/Home"> Home</Link>
          </li>
          <li>
          <Link to ="/Series">Series</Link>
          </li>
        <li>
         <Link to ="/movies">Movies</Link> 
        </li>
        
        
        
      </ul>
      </div>
      <div>
       <ul>
       <li> <Link to ="/myprofile">My profile</Link></li>
       <li>
      {user === null &&
       <Link to ="/Login">Login</Link> 
      }
      </li>
      <li>
       {user &&
      <Link to ="/Logout">Logout</Link> 
       }
     </li>
      </ul> 
      </div>
    </nav>
  )
}
