import React from 'react'
import "./homeScreen.css"
import Nav from '../../components/nav/nav'
import Banner from '../../components/banner/banner'
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
          <Banner/>
      </div>
  )
}

export default HomeScreen