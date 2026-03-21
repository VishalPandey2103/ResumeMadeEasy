import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div id="cta" className="scroll-mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-24"
      style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto rounded-2xl p-12 text-center"
        style={{ background: '#1a1a1a' }}>
        <p className="text-xs uppercase tracking-widest font-medium mb-4"
          style={{ color: '#d97706' }}>
          Ready when you are
        </p>
        <h2 className="text-3xl md:text-4xl font-medium mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: '#f7f5f0' }}>
          Your next opportunity starts with a better resume.
        </h2>
        <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: '#9ca3af' }}>
          Free to start. No credit card needed. Build, preview, and download in minutes.
        </p>
        <Link to="/app"
          className="inline-block px-8 py-3 rounded-md text-sm font-medium transition-colors"
          style={{ background: '#d97706', color: 'white' }}>
          Start building for free →
        </Link>
      </div>
    </div>
  )
}

export default CallToAction
