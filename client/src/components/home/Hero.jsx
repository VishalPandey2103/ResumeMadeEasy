import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='w-full py-20 px-6 flex flex-col items-center text-center'>
      <span className='text-xs font-medium px-3 py-1 rounded-full mb-6'
        style={{ background: '#fef3c7', color: '#92400e' }}>
        AI-Powered Resume Builder
      </span>

      <h1 className='text-4xl sm:text-5xl font-bold leading-tight max-w-2xl'
        style={{ color: 'var(--text)' }}>
        Build a resume that gets you hired
      </h1>

      <p className='mt-4 text-base max-w-xl'
        style={{ color: 'var(--text-muted)' }}>
        Create, customize, and share professional resumes in minutes.
        Let AI enhance your content and stand out from the crowd.
      </p>

      <div className='mt-8 flex gap-3'>
        <Link to='/app'
          className='px-6 py-2.5 rounded-md text-sm font-medium transition-colors'
          style={{ background: 'var(--text)', color: 'white' }}>
          Get started free
        </Link>
        <Link to='/app'
          className='px-6 py-2.5 rounded-md text-sm font-medium border transition-colors'
          style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
          See templates
        </Link>
      </div>
    </section>
  )
}

export default Hero