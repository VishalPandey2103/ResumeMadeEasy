import React from 'react'

const Title = ({ title, subtitle }) => {
  return (
    <div className='text-center mb-10'>
      <h2 className='text-2xl font-semibold' style={{ color: 'var(--text)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className='text-sm mt-2' style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default Title