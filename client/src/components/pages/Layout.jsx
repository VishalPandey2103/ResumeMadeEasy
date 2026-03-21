import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar.jsx'
import { useSelector } from 'react-redux'
import Loader from '../Loader.jsx'
import Login from './Login.jsx'

const Layout = () => {
  const { user, loading } = useSelector(state => state.auth)

  if (loading) return <Loader />

  return (
    <div>
      {user ? (
        <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Layout
