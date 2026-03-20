import React, { useState } from 'react'
import { PlusIcon, TrashIcon, SparklesIcon, LoaderCircleIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const empty = {
  company: '', position: '', start_date: '',
  end_date: '', description: '', is_current: false
}

const ExperienceForm = ({ resumeData, setResumeData }) => {
  const { token } = useSelector(state => state.auth)
  const [enhancingIndex, setEnhancingIndex] = useState(null)

  const handleChange = (index, field, value) => {
    const updated = resumeData.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    )
    setResumeData({ ...resumeData, experience: updated })
  }

  const addExperience = () => {
    setResumeData({ ...resumeData, experience: [...resumeData.experience, { ...empty }] })
  }

  const removeExperience = (index) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index)
    })
  }

  const enhanceDescription = async (index) => {
    const desc = resumeData.experience[index].description
    if (!desc) {
      toast.error('Write a description first before enhancing')
      return
    }
    setEnhancingIndex(index)
    try {
      const { data } = await api.post('/api/ai/enhance-job-desc',
        { userContent: desc },
        { headers: { Authorization: token } }
      )
      handleChange(index, 'description', data.enhancedContent)
      toast.success('Description enhanced!')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setEnhancingIndex(null)
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-sm font-semibold' style={{ color: 'var(--text)' }}>
        Work Experience
      </h2>

      {resumeData.experience.length === 0 && (
        <p className='text-sm' style={{ color: 'var(--text-muted)' }}>
          No experience added yet.
        </p>
      )}

      {resumeData.experience.map((exp, index) => (
        <div key={index} className='p-4 rounded-lg border space-y-3'
          style={{ borderColor: 'var(--border)' }}>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium' style={{ color: 'var(--text-muted)' }}>
              Experience {index + 1}
            </span>
            <button onClick={() => removeExperience(index)}
              className='p-1 rounded hover:bg-red-50 transition-colors'>
              <TrashIcon size={13} color='#dc2626' />
            </button>
          </div>

          {[
            { label: 'Company', field: 'company', placeholder: 'Google' },
            { label: 'Position', field: 'position', placeholder: 'Software Engineer' },
          ].map(f => (
            <div key={f.field}>
              <label className='block text-xs mb-1' style={{ color: 'var(--text-muted)' }}>
                {f.label}
              </label>
              <input type='text' placeholder={f.placeholder}
                value={exp[f.field] || ''}
                onChange={e => handleChange(index, f.field, e.target.value)} />
            </div>
          ))}

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-xs mb-1' style={{ color: 'var(--text-muted)' }}>
                Start Date
              </label>
              <input type='text' placeholder='Jan 2022'
                value={exp.start_date || ''}
                onChange={e => handleChange(index, 'start_date', e.target.value)} />
            </div>
            <div>
              <label className='block text-xs mb-1' style={{ color: 'var(--text-muted)' }}>
                End Date
              </label>
              <input type='text' placeholder='Dec 2023'
                value={exp.end_date || ''}
                disabled={exp.is_current}
                onChange={e => handleChange(index, 'end_date', e.target.value)} />
            </div>
          </div>

          <label className='flex items-center gap-2 cursor-pointer w-fit'>
            <input type='checkbox' checked={exp.is_current || false}
              onChange={e => handleChange(index, 'is_current', e.target.checked)}
              className='w-3.5 h-3.5' />
            <span className='text-xs' style={{ color: 'var(--text-muted)' }}>
              Currently working here
            </span>
          </label>

          <div>
            <label className='block text-xs mb-1' style={{ color: 'var(--text-muted)' }}>
              Description
            </label>
            <textarea rows={3} placeholder='Describe your responsibilities and achievements...'
              value={exp.description || ''}
              onChange={e => handleChange(index, 'description', e.target.value)}
              style={{ resize: 'none' }} />
          </div>

          <button onClick={() => enhanceDescription(index)}
            disabled={enhancingIndex === index}
            className='flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors'
            style={{
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
              opacity: enhancingIndex === index ? 0.7 : 1
            }}>
            {enhancingIndex === index
              ? <LoaderCircleIcon size={12} className='animate-spin' />
              : <SparklesIcon size={12} />}
            {enhancingIndex === index ? 'Enhancing...' : 'Enhance with AI'}
          </button>
        </div>
      ))}

      <button onClick={addExperience}
        className='flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-colors'
        style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
        <PlusIcon size={14} /> Add Experience
      </button>
    </div>
  )
}

export default ExperienceForm