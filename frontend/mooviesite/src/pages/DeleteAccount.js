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
      console.log(username);
      await fetch(`http://localhost:3001/reviews/deletereview/${username}`, {
        
      method: "DELETE",
      headers: { "Content-Type": "application/json" }, //lähetämme pyynnön JSON-muodossa
    })
        const response = await fetch(`http://localhost:3001/user/delete/${username}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, //lähetämme pyynnön JSON-muodossa
      })
      if(response.ok) {
        alert("käyttäjä poistettu")
        
      //delreview()

      }
    }
    
} catch (error) {
    alert("error")
}
       
    }
    /*const delreview = async () => {
    try {
      const response =await fetch(`http://localhost:3001/reviews/deletereview/${username}`, {
        
        method: "DELETE",
        headers: { "Content-Type": "application/json" }, //lähetämme pyynnön JSON-muodossa
        body: JSON.stringify({
          //muutetaan json muotoon
          //accountname: username,
          
        }),
        
      })
      console.log("asdsad" + response);
    } catch (error) {
      
    }
    */
    return (
      <div id='delete-form'>
          <form onSubmit={poistha}>
          <button type='submit'>Delete your account</button>
          </form>
      </div>
  
  
  )
}

