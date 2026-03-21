import React from 'react'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 py-12"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 600 }}>
            Resume<span style={{ color: 'var(--accent)' }}>MadeEasy</span>
          </span>
          <p className="text-xs mt-2 max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            A fast, no-fuss resume builder for people who'd rather be working than formatting.
          </p>
        </div>

        <div className="flex gap-12 text-sm">
          <div>
            <p className="font-medium mb-3" style={{ color: 'var(--text)' }}>Product</p>
            <ul className="space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li><a href="/" className="hover:text-amber-600 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-amber-600 transition-colors">Features</a></li>
              <li><a href="/app" className="hover:text-amber-600 transition-colors">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-3" style={{ color: 'var(--text)' }}>Legal</p>
            <ul className="space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li><a href="/" className="hover:text-amber-600 transition-colors">Privacy</a></li>
              <li><a href="/" className="hover:text-amber-600 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          © 2025 ResumeMadeEasy. All rights reserved.
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Built with React + Node.js
        </p>
      </div>
    </footer>
  )
}

export default Footer
