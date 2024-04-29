import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function DeleteAccount({user}) {
    const token = localStorage.getItem("jwtToken")
    console.log(user);
    console.log("tuleeks tää" + token);
    const {user:username} = user
    console.log("tässä kirjautuneen käyttäjän tunnus" + username);
    const navigate = useNavigate()
    const poistha = async(e) => {
        e.preventDefault()

try {
    
        
    if(token) {
      console.log(username);
      await fetch(`http://localhost:3001/reviews/deletereview/${username}`, {
        
      method: "DELETE",
      headers: { "Content-Type": "application/json" }, //lähetämme pyynnön JSON-muodossa
    })
    await fetch(`http://localhost:3001/favourites/deletefavourite/${username}`, {

      method: "DELETE",
      headers: { "Content-Type": "application/json" }, 
    })
        const response = await fetch(`http://localhost:3001/user/delete/${username}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, //lähetämme pyynnön JSON-muodossa
      })
      if(response.ok) {
        alert("käyttäjä poistettu")
        navigate("/logout")
      }
    }
    
} catch (error) {
    alert("error")
}
       
    }

    return (
      <div id='delete-form'>
          <form onSubmit={poistha}>
          <button type='submit'>Delete your account</button>
          </form>
      </div>
  
  
  )
}

