import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full px-6 py-8 border-t'
      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <div className='max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
        <span className='font-semibold text-sm' style={{ color: 'var(--text)' }}>
          ResumeMadeEasy
        </span>

        <div className='flex gap-6'>
          <Link to='/' className='text-sm' style={{ color: 'var(--text-muted)' }}>
            Home
          </Link>
          <Link to='/app' className='text-sm' style={{ color: 'var(--text-muted)' }}>
            Dashboard
          </Link>
        </div>

        <p className='text-xs' style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} ResumeMadeEasy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer