import React from 'react'

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--bg)' }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 rounded-full animate-spin"
          style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }} />
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Loading…</p>
      </div>
    </div>
  )
}

export default Loader
