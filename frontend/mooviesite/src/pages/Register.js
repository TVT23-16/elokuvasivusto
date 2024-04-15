import React, { useState } from "react";
import "./Register.css"
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Register() {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
  const registration = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3001/auth/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            accountname: username,
            password: password
            
        })
        
      })
      console.log(response)
      if(response.ok && response != null) {
        navigate("/")
      }

    } catch (error) {}
  };
  console.log(username);
  return (
    <div id="register-form">
    <form onSubmit={registration}>
    <h3>Register</h3>
    <div>
    <label>Username</label>
    <input value={username}onChange={(e) => setUsername(e.target.value)}/>
    <div>
    <label>Password</label>
    <input type="password"value={password}onChange={(e) => setPassword(e.target.value)}/>
    </div>
    </div>
    <button type="submit"> Register</button>

    </form>
  </div>
  )
}
