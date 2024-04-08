import React from 'react'
import {Navigate } from 'react-router-dom'

export default function myprofile({user}) {
  if (user === null)
  {
    return <Navigate to ="/login"/>
  }
  return (
    <div>MINUN PROFIILINI</div>
  )
}
