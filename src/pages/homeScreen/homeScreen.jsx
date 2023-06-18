import React, { useEffect } from 'react'
import "./homeScreen.css"
import Nav from '../../components/nav/nav'
import Banner from '../../components/banner/banner'
import Row from '../../components/row/row'
import requests from '../../api/request'
import { useNavigate } from 'react-router-dom'
import { selectUser, selectUserSubscription } from '../../redux/userSlice'
import { useSelector } from 'react-redux'
const HomeScreen = () => {
  const { fetchTrending, fetchNetflixOriginals, fetchActionMovies, fetchComedyMovies, fetchRomanceMovies, fetchHorrorMovies, fetchDocumentaries, fetchTopRated } = requests
  
  const user = useSelector(selectUser)
  const userSubscription = useSelector(selectUserSubscription)
  // console.log(user)
  const navigate = useNavigate()
  const handleNavigation = () => {
    if (user === null) navigate("/login")
    else if (!userSubscription) navigate("/profile")
    // else if(userSubscription?.status !== "active") navigate("/profile")
  }
  
  useEffect(() => {
    handleNavigation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  return (
      <div className='homeScreen'>
      {/**
      Component Structure 
       Navbar
        Banner 
        Rows 
    */}
          <Nav />
      <Banner />
      <Row
        title="Netflix originals"
        fetchUrl={fetchNetflixOriginals}
        isLargeRow
      /> <Row
        title="Trending Now"
        fetchUrl={fetchTrending}
      /> <Row
        title="Top Rated"
        fetchUrl={fetchTopRated}
      /> <Row
        title="Action Movies"
        fetchUrl={fetchActionMovies}
      /> <Row
        title="Comedy Movies"
        fetchUrl={fetchComedyMovies}
      /> <Row
        title="Horror Movies"
        fetchUrl={fetchHorrorMovies}
      /> <Row
        title="Romance Movies"
        fetchUrl={fetchRomanceMovies}
      /><Row
        title="Documentaries"
        fetchUrl={fetchDocumentaries}
      />
      </div>
  )
}

export default HomeScreen