import React from 'react'
import "./homeScreen.css"
import Nav from '../../components/nav/nav'
const HomeScreen = () => {
  return (
      <div className='HomeScreen'>
      {/**
      Component Structure 
       Navbar
        Banner 
        Rows 
    */}
          <Nav />
          
      </div>
  )
}

export default HomeScreen