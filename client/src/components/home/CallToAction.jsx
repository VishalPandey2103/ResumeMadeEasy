import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <section className='w-full py-16 px-6 text-center'>
      <div className='max-w-xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-3' style={{ color: 'var(--text)' }}>
          Ready to build your resume?
        </h2>
        <p className='text-sm mb-6' style={{ color: 'var(--text-muted)' }}>
          It's free. No credit card required. Get started in seconds.
        </p>
        <Link to='/app'
          className='inline-block px-8 py-3 rounded-md text-sm font-medium transition-colors'
          style={{ background: 'var(--text)', color: 'white' }}>
          Start building now
        </Link>
      </div>
    </section>
  )
}

export default CallToAction