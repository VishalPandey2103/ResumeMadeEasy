import { FolderOpen, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => onChange([...data, { name: '', type: '', description: '' }])
  const removeProject = (i) => onChange(data.filter((_, idx) => idx !== i))
  const updateProject = (i, field, value) => {
    const updated = [...data]
    updated[i] = { ...updated[i], [field]: value }
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Projects</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Personal and academic projects</p>
        </div>
        <button onClick={addProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border"
          style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'white' }}>
          <Plus size={12} /> Add
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-10">
          <FolderOpen size={28} className="mx-auto mb-2" style={{ color: 'var(--border)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No projects added yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((proj, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3"
              style={{ borderColor: 'var(--border)', background: '#fafaf9' }}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Project {i + 1}</p>
                <button onClick={() => removeProject(i)} className="p-1 rounded hover:bg-red-50">
                  <Trash2 size={13} style={{ color: '#dc2626' }} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input value={proj.name || ''} onChange={e => updateProject(i, 'name', e.target.value)}
                  placeholder="Project name" className="w-full" />
                <input value={proj.type || ''} onChange={e => updateProject(i, 'type', e.target.value)}
                  placeholder="Type (e.g. Web App)" className="w-full" />
              </div>
              <textarea value={proj.description || ''} rows={3}
                onChange={e => updateProject(i, 'description', e.target.value)}
                placeholder="What it does, technologies used, your role..." />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectForm
