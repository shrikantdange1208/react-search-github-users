import React from 'react'
import { Navbar, Repos, Search, User, Info } from '../components'
import { useSelector } from 'react-redux'
import loadingImage from '../images/preloader.gif'

const Dashboard = () => {
  const { isLoading } = useSelector((store) => store.github)
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className="loading-img" alt="loading..." />
      </main>
    )
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )
}

export default Dashboard
