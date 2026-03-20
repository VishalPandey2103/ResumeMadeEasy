import React from 'react'

const templates = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'minimal-image', label: 'Minimal Image' },
  { id: 'academic', label: 'Academic' },
]

const TemplateSelector = ({ resumeData, setResumeData }) => {

  const handleSelect = (templateId) => {
    setResumeData({ ...resumeData, template: templateId })
  }

  return (
    <div className='space-y-3'>
      <h2 className='text-sm font-semibold' style={{ color: 'var(--text)' }}>
        Template
      </h2>

      <div className='grid grid-cols-2 gap-2'>
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => handleSelect(t.id)}
            className='px-3 py-2.5 rounded-lg border text-sm font-medium transition-all'
            style={{
              borderColor: resumeData.template === t.id ? 'var(--accent)' : 'var(--border)',
              background: resumeData.template === t.id ? '#fef3c7' : 'var(--bg)',
              color: resumeData.template === t.id ? '#92400e' : 'var(--text)',
            }}>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector