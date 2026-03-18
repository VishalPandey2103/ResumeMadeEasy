import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../app/features/authSlice'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className='w-full px-6 py-4 flex items-center justify-between border-b'
      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>

      <Link to='/' className='font-semibold text-base tracking-tight'
        style={{ color: 'var(--text)' }}>
        ResumeMadeEasy
      </Link>

      <div className='flex items-center gap-4'>
        {user ? (
          <>
            <span className='text-sm' style={{ color: 'var(--text-muted)' }}>
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className='text-sm px-4 py-1.5 rounded-md border transition-colors'
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to='/login'
            className='text-sm px-4 py-1.5 rounded-md transition-colors'
            style={{ background: 'var(--text)', color: 'white' }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar