
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Movies({user}) {
  if (user === null)
  {
    return <Navigate to ="/login"/>
  }
  return (
    <p>Here is the list of all the shitty movies</p>
  )
}
