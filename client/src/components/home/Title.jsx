import React from 'react'

const Title = ({ title, description, tag }) => {
  return (
    <div className='text-center mt-5' style={{ color: 'var(--text)' }}>
      {tag && (
        <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: 'var(--accent)' }}>
          {tag}
        </p>
      )}
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}
        className='text-3xl sm:text-4xl'>
        {title}
      </h2>
      {description && (
        <p className='max-w-xl mx-auto mt-3 text-sm leading-relaxed' style={{ color: 'var(--text-muted)' }}>
          {description}
        </p>
      )}
    </div>
  )
}

export default Title
