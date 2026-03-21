import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => onChange([...data, { institution: '', degree: '', field: '', graduation_date: '', gpa: '' }])
  const removeEducation = (i) => onChange(data.filter((_, idx) => idx !== i))
  const updateEducation = (i, field, value) => {
    const updated = [...data]
    updated[i] = { ...updated[i], [field]: value }
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Education</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Degrees and certifications</p>
        </div>
        <button onClick={addEducation}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border"
          style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'white' }}>
          <Plus size={12} /> Add
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-10">
          <GraduationCap size={28} className="mx-auto mb-2" style={{ color: 'var(--border)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No education added yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((edu, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3"
              style={{ borderColor: 'var(--border)', background: '#fafaf9' }}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Education {i + 1}</p>
                <button onClick={() => removeEducation(i)} className="p-1 rounded hover:bg-red-50">
                  <Trash2 size={13} style={{ color: '#dc2626' }} />
                </button>
              </div>
              <input value={edu.institution || ''} onChange={e => updateEducation(i, 'institution', e.target.value)}
                placeholder="Institution name" className="w-full" />
              <div className="grid grid-cols-2 gap-2">
                <input value={edu.degree || ''} onChange={e => updateEducation(i, 'degree', e.target.value)}
                  placeholder="Degree (e.g. B.Tech)" className="w-full" />
                <input value={edu.field || ''} onChange={e => updateEducation(i, 'field', e.target.value)}
                  placeholder="Field of study" className="w-full" />
                <input value={edu.graduation_date || ''} onChange={e => updateEducation(i, 'graduation_date', e.target.value)}
                  type="month" className="w-full" placeholder="Graduation" />
                <input value={edu.gpa || ''} onChange={e => updateEducation(i, 'gpa', e.target.value)}
                  placeholder="GPA (optional)" className="w-full" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm
