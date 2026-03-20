import React from 'react'

const colors = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
  '#6366F1',
  '#111827',
]

const ColorPicker = ({ resumeData, setResumeData }) => {

  const handleColorChange = (color) => {
    setResumeData({ ...resumeData, accent_color: color })
  }

  return (
    <div className='space-y-3'>
      <h2 className='text-sm font-semibold' style={{ color: 'var(--text)' }}>
        Accent Color
      </h2>

      <div className='flex flex-wrap gap-2'>
        {colors.map(color => (
          <button
            key={color}
            onClick={() => handleColorChange(color)}
            className='w-7 h-7 rounded-full transition-transform hover:scale-110'
            style={{
              background: color,
              outline: resumeData.accent_color === color ? `2px solid ${color}` : 'none',
              outlineOffset: '2px'
            }}
          />
        ))}
      </div>

      <div className='flex items-center gap-3'>
        <label className='text-xs' style={{ color: 'var(--text-muted)' }}>
          Custom
        </label>
        <input
          type='color'
          value={resumeData.accent_color || '#3B82F6'}
          onChange={e => handleColorChange(e.target.value)}
          className='w-8 h-8 rounded cursor-pointer border-0 p-0'
          style={{ background: 'none' }}
        />
        <span className='text-xs font-mono' style={{ color: 'var(--text-muted)' }}>
          {resumeData.accent_color}
        </span>
      </div>
    </div>
  )
}

export default ColorPicker