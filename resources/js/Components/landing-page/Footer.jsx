import React, { useContext } from 'react'
import ThemeContext from './ThemeContext'

function Footer() {
    let theme=useContext(ThemeContext);
  return (
    <footer>
        <h1>Made by Mohammad Zen Al-Abdeen</h1>
        <h2>@2024</h2>
    </footer>
  )
}

export default Footer