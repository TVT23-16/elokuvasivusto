import React, { useState } from 'react'

export default function DeleteAccount({user}) {
    const token = localStorage.getItem("jwtToken")
    console.log(user);
    console.log("tuleeks tää" + token);
    const {user:username} = user
    console.log("tässä kirjautuneen käyttäjän tunnus" + username);
    const poistha = async(e) => {
        e.preventDefault()

try {
    
        
    if(token) {
    
        const response = await fetch(`http://localhost:3001/user/delete/${username}`, {
        
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, //lähetämme pyynnön JSON-muodossa
        body: JSON.stringify({
          //muutetaan json muotoon
          //accountname: username,
          
        }),
      })
      if(response.ok) {
        alert("käyttäjä poistettu")
      }
    }
    
} catch (error) {
    alert("error")
}
       
    }

  return (
    <div id='delete-form'>
        <form onSubmit={poistha}>
        <button type='submit'>Delete your account pls dont press</button>
        </form>
    </div>
  )
}

