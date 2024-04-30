import React from 'react'
import { useLanguage } from "../LanguageContext";

export default function Logout({setUser}) {
    setUser(null)
    const { language, toggleLanguage } = useLanguage()
  return (
    <div>
      <p>
    {language === 'ENG' ? 'You have logged out' : 'Kirjauduit ulos'}
    </p>
    </div>
  )
}
