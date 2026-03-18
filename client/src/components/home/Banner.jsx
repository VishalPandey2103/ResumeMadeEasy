import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <section className='w-full py-14 px-6'>
      <div className='max-w-4xl mx-auto rounded-2xl px-10 py-12 text-center'
        style={{ background: 'var(--text)' }}>
        <h2 className='text-2xl font-semibold text-white mb-3'>
          Your next job starts with a great resume
        </h2>
        <p className='text-sm mb-6' style={{ color: '#9ca3af' }}>
          Join thousands of job seekers who built their resume with ResumeMadeEasy.
        </p>
        <Link to='/app'
          className='inline-block px-6 py-2.5 rounded-md text-sm font-medium transition-colors'
          style={{ background: 'var(--accent)', color: 'white' }}>
          Build my resume
        </Link>
      </div>
    </section>
  )
}

export default Banner