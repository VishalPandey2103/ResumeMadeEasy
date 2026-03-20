import React from 'react'
import { PlusIcon, TrashIcon } from 'lucide-react'

const empty = { name: '', type: '', description: '' }

const ProjectForm = ({ resumeData, setResumeData }) => {

  const handleChange = (index, field, value) => {
    const updated = resumeData.project.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    )
    setResumeData({ ...resumeData, project: updated })
  }

  const addProject = () => {
    setResumeData({ ...resumeData, project: [...resumeData.project, { ...empty }] })
  }

  const removeProject = (index) => {
    setResumeData({
      ...resumeData,
      project: resumeData.project.filter((_, i) => i !== index)
    })
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-sm font-semibold' style={{ color: 'var(--text)' }}>
        Projects
      </h2>

      {resumeData.project.length === 0 && (
        <p className='text-sm' style={{ color: 'var(--text-muted)' }}>
          No projects added yet.
        </p>
      )}

      {resumeData.project.map((proj, index) => (
        <div key={index} className='p-4 rounded-lg border space-y-3'
          style={{ borderColor: 'var(--border)' }}>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium' style={{ color: 'var(--text-muted)' }}>
              Project {index + 1}
            </span>
            <button onClick={() => removeProject(index)}
              className='p-1 rounded hover:bg-red-50 transition-colors'>
              <TrashIcon size={13} color='#dc2626' />
            </button>
          </div>

          {[
            { label: 'Project Name', field: 'name', placeholder: 'ResumeMadeEasy' },
            { label: 'Type', field: 'type', placeholder: 'Full Stack Web App' },
          ].map(f => (
            <div key={f.field}>
              <label className='block text-xs mb-1' style={{ color: 'var(--text-muted)' }}>
                {f.label}
              </label>
              <input type='text' placeholder={f.placeholder}
                value={proj[f.field] || ''}
                onChange={e => handleChange(index, f.field, e.target.value)} />
            </div>
          ))}

          <div>
            <label className='block text-xs mb-1' style={{ color: 'var(--text-muted)' }}>
              Description
            </label>
            <textarea rows={3}
              placeholder='Briefly describe what this project does and your role...'
              value={proj.description || ''}
              onChange={e => handleChange(index, 'description', e.target.value)}
              style={{ resize: 'none' }} />
          </div>
        </div>
      ))}

      <button onClick={addProject}
        className='flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-colors'
        style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
        <PlusIcon size={14} /> Add Project
      </button>
    </div>
  )
}

export default ProjectForm