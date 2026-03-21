import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate.jsx'
import ModernTemplate from './templates/ModernTemplate.jsx'
import MinimalTemplate from './templates/MinimalTemplate.jsx'
import MinimalImageTemplate from './templates/MinimalImageTemplate.jsx'
import AcademicTemplate from './templates/AcademicTemplate.jsx'

const ResumePreview = ({ data, template, accentColor, classes = '' }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':       return <ModernTemplate data={data} accentColor={accentColor} />
      case 'minimal':      return <MinimalTemplate data={data} accentColor={accentColor} />
      case 'minimal-image': return <MinimalImageTemplate data={data} accentColor={accentColor} />
      case 'academic':     return <AcademicTemplate data={data} accentColor={accentColor} />
      default:             return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border"
      style={{ background: '#f0ede6', borderColor: 'var(--border)' }}>
      <div id="resume-preview"
        className={'print:shadow-none print:border-none print:rounded-none ' + classes}>
        {renderTemplate()}
      </div>
    </div>
  )
}

export default ResumePreview
