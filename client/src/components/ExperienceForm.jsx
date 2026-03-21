import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector(state => state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const addExperience = () => onChange([...data, { company: '', position: '', start_date: '', end_date: '', description: '', is_current: false }])
  const removeExperience = (i) => onChange(data.filter((_, idx) => idx !== i))
  const updateExperience = (i, field, value) => {
    const updated = [...data]
    updated[i] = { ...updated[i], [field]: value }
    onChange(updated)
  }

  const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const exp = data[index]
    try {
      const { data: res } = await api.post('api/ai/enhance-job-desc',
        { userContent: `enhance this job description "${exp.description}" for position ${exp.position} at ${exp.company}` },
        { headers: { Authorization: token } })
      updateExperience(index, 'description', res.enhancedContent)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Experience</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Your work history, most recent first</p>
        </div>
        <button onClick={addExperience}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'white' }}>
          <Plus size={12} /> Add
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-10">
          <Briefcase size={28} className="mx-auto mb-2" style={{ color: 'var(--border)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No experience added yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((exp, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3"
              style={{ borderColor: 'var(--border)', background: '#fafaf9' }}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  Experience {i + 1}
                </p>
                <button onClick={() => removeExperience(i)} className="p-1 rounded hover:bg-red-50 transition-colors">
                  <Trash2 size={13} style={{ color: '#dc2626' }} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input value={exp.company || ''} onChange={e => updateExperience(i, 'company', e.target.value)}
                  placeholder="Company" className="w-full" />
                <input value={exp.position || ''} onChange={e => updateExperience(i, 'position', e.target.value)}
                  placeholder="Job title" className="w-full" />
                <input value={exp.start_date || ''} onChange={e => updateExperience(i, 'start_date', e.target.value)}
                  type="month" className="w-full" />
                <input value={exp.end_date || ''} onChange={e => updateExperience(i, 'end_date', e.target.value)}
                  type="month" disabled={exp.is_current} className="w-full disabled:opacity-50" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={exp.is_current || false}
                  onChange={e => updateExperience(i, 'is_current', e.target.checked)} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Currently working here</span>
              </label>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Description</label>
                  <button
                    onClick={() => generateDescription(i)}
                    disabled={generatingIndex === i || !exp.position || !exp.company}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors disabled:opacity-40"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'white' }}>
                    {generatingIndex === i ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                    AI
                  </button>
                </div>
                <textarea value={exp.description || ''} rows={3}
                  onChange={e => updateExperience(i, 'description', e.target.value)}
                  placeholder="Key responsibilities and achievements..." />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm
