import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Hero = () => {
  const { user } = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}
        className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 sticky top-0 z-50">
        <a href="/" className="flex items-center gap-2">
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 600, color: 'var(--text)' }}>
            Resume<span style={{ color: 'var(--accent)' }}>MadeEasy</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          <a href="#" className="hover:text-amber-600 transition-colors">Home</a>
          <a href="#features" className="hover:text-amber-600 transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-amber-600 transition-colors">Reviews</a>
          <a href="#cta" className="hover:text-amber-600 transition-colors">Contact</a>
        </div>

        <div className="flex gap-2 items-center">
          {!user ? (
            <>
              <Link to="/app?state=login"
                className="hidden md:block text-sm px-5 py-2 rounded-md border transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                Log in
              </Link>
              <Link to="/app?state=register"
                className="hidden md:block text-sm px-5 py-2 rounded-md transition-colors font-medium"
                style={{ background: 'var(--text)', color: 'var(--bg)' }}>
                Get started
              </Link>
            </>
          ) : (
            <Link to="/app"
              className="hidden md:block text-sm px-5 py-2 rounded-md font-medium transition-colors"
              style={{ background: 'var(--accent)', color: 'white' }}>
              Dashboard →
            </Link>
          )}

          <button className="md:hidden p-1" onClick={() => setMenuOpen(true)}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h16M3 12h16M3 18h16"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 text-lg"
          style={{ background: 'var(--bg)' }}>
          <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#cta" onClick={() => setMenuOpen(false)}>Contact</a>
          <button onClick={() => setMenuOpen(false)}
            className="mt-4 px-6 py-2 rounded-md text-sm"
            style={{ background: 'var(--text)', color: 'var(--bg)' }}>
            Close
          </button>
        </div>
      )}

      {/* Hero */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-24"
        style={{ background: 'var(--bg)' }}>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide"
          style={{ background: '#1a1a1a', color: '#fef3c7' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
          10,000+ resumes built
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight max-w-3xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--text)' }}>
          Resumes that get you through the door.
        </h1>

        <p className="mt-6 text-base max-w-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Build, edit, and download polished resumes in minutes. AI fills in the gaps, you take the interview.
        </p>

        <div className="flex flex-wrap gap-3 mt-10">
          <Link to="/app"
            className="px-7 py-3 rounded-md text-sm font-medium transition-colors"
            style={{ background: 'var(--text)', color: 'var(--bg)' }}>
            Build my resume →
          </Link>
          <a href="#features"
            className="px-7 py-3 rounded-md text-sm border transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            How it works
          </a>
        </div>

        {/* Social proof row */}
        <div className="flex items-center gap-4 mt-14">
          <div className="flex -space-x-2">
            {[
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
              'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
              'https://randomuser.me/api/portraits/men/75.jpg',
            ].map((src, i) => (
              <img key={i} src={src} className="w-8 h-8 rounded-full border-2 object-cover"
                style={{ borderColor: 'var(--bg)' }} />
            ))}
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Trusted by engineers, designers, and students worldwide
          </p>
        </div>
      </div>
    </>
  )
}

export default Hero
