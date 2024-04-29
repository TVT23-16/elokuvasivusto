import React from 'react'

export default function Logout({setUser}) {
    setUser(null)
  return (
    <p>Kirjaudut ulos</p>
  )
}
