import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Skills</h3>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Add technologies and tools you know</p>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }}
          placeholder="e.g. React, Node.js, AWS..."
          className="flex-1" />
        <button onClick={addSkill}
          className="px-3 py-2 rounded-md text-xs font-medium"
          style={{ background: 'var(--text)', color: 'white' }}>
          <Plus size={14} />
        </button>
      </div>

      {data.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, i) => (
            <span key={i}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border"
              style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'white' }}>
              {skill}
              <button onClick={() => removeSkill(i)} className="hover:text-red-500 transition-colors">
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      {data.length === 0 && (
        <p className="text-xs text-center py-6" style={{ color: 'var(--text-muted)' }}>
          Type a skill and press Enter or click +
        </p>
      )}
    </div>
  )
}

export default SkillsForm
