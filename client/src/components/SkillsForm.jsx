import React, { useState } from 'react'
import { PlusIcon, XIcon } from 'lucide-react'

const SkillsForm = ({ resumeData, setResumeData }) => {
  const [input, setInput] = useState('')

  const addSkill = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    if (resumeData.skills.includes(trimmed)) return
    setResumeData({ ...resumeData, skills: [...resumeData.skills, trimmed] })
    setInput('')
  }

  const removeSkill = (skill) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(s => s !== skill)
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-sm font-semibold' style={{ color: 'var(--text)' }}>
        Skills
      </h2>

      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='e.g. React, Node.js, MongoDB'
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addSkill}
          className='px-3 py-2 rounded-md border transition-colors shrink-0'
          style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
          <PlusIcon size={15} />
        </button>
      </div>

      {resumeData.skills.length === 0 && (
        <p className='text-sm' style={{ color: 'var(--text-muted)' }}>
          No skills added yet. Type a skill and press Enter.
        </p>
      )}

      <div className='flex flex-wrap gap-2'>
        {resumeData.skills.map((skill, i) => (
          <span key={i}
            className='flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium'
            style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            {skill}
            <button onClick={() => removeSkill(skill)}
              className='hover:text-red-500 transition-colors'>
              <XIcon size={11} />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

export default SkillsForm