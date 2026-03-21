import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice.js'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }

  return (
    <div style={{ borderBottom: '1px solid var(--border)', background: 'white' }}>
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3.5 text-sm">
        <Link to="/">
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)' }}>
            Resume<span style={{ color: 'var(--accent)' }}>MadeEasy</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <p className="max-sm:hidden text-sm" style={{ color: 'var(--text-muted)' }}>
            {user?.name}
          </p>
          <button
            onClick={logoutUser}
            className="text-sm px-5 py-1.5 rounded-md border transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
            Log out
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
