import React from 'react'
import { PlusIcon, TrashIcon } from 'lucide-react'

const empty = {
  institution: '', degree: '', field: '', graduation_date: '', gpa: ''
}

const EducationForm = ({ resumeData, setResumeData }) => {

  const handleChange = (index, field, value) => {
    const updated = resumeData.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    )
    setResumeData({ ...resumeData, education: updated })
  }

  const addEducation = () => {
    setResumeData({ ...resumeData, education: [...resumeData.education, { ...empty }] })
  }

  const removeEducation = (index) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index)
    })
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-sm font-semibold' style={{ color: 'var(--text)' }}>
        Education
      </h2>

      {resumeData.education.length === 0 && (
        <p className='text-sm' style={{ color: 'var(--text-muted)' }}>
          No education added yet.
        </p>
      )}

      {resumeData.education.map((edu, index) => (
        <div key={index} className='p-4 rounded-lg border space-y-3'
          style={{ borderColor: 'var(--border)' }}>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium' style={{ color: 'var(--text-muted)' }}>
              Education {index + 1}
            </span>
            <button onClick={() => removeEducation(index)}
              className='p-1 rounded hover:bg-red-50 transition-colors'>
              <TrashIcon size={13} color='#dc2626' />
            </button>
          </div>

          {[
            { label: 'Institution', field: 'institution', placeholder: 'IIT Delhi' },
            { label: 'Degree', field: 'degree', placeholder: 'Bachelor of Technology' },
            { label: 'Field of Study', field: 'field', placeholder: 'Computer Science' },
            { label: 'Graduation Date', field: 'graduation_date', placeholder: 'May 2024' },
            { label: 'GPA', field: 'gpa', placeholder: '8.5 / 10' },
          ].map(f => (
            <div key={f.field}>
              <label className='block text-xs mb-1' style={{ color: 'var(--text-muted)' }}>
                {f.label}
              </label>
              <input type='text' placeholder={f.placeholder}
                value={edu[f.field] || ''}
                onChange={e => handleChange(index, f.field, e.target.value)} />
            </div>
          ))}
        </div>
      ))}

      <button onClick={addEducation}
        className='flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-colors'
        style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
        <PlusIcon size={14} /> Add Education
      </button>
    </div>
  )
}

export default EducationForm