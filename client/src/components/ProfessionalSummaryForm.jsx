import React, { useState } from 'react'
import { SparklesIcon, LoaderCircleIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ resumeData, setResumeData }) => {
  const { token } = useSelector(state => state.auth)
  const [enhancing, setEnhancing] = useState(false)

  const handleChange = (e) => {
    setResumeData({ ...resumeData, professional_summary: e.target.value })
  }

  const enhanceSummary = async () => {
    if (!resumeData.professional_summary) {
      toast.error('Write something first before enhancing')
      return
    }
    setEnhancing(true)
    try {
      const { data } = await api.post('/api/ai/enhance-pro-sum',
        { userContent: resumeData.professional_summary },
        { headers: { Authorization: token } }
      )
      setResumeData({ ...resumeData, professional_summary: data.enhancedContent })
      toast.success('Summary enhanced!')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setEnhancing(false)
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-sm font-semibold' style={{ color: 'var(--text)' }}>
        Professional Summary
      </h2>

      <div>
        <label className='block text-xs mb-1.5' style={{ color: 'var(--text-muted)' }}>
          Summary
        </label>
        <textarea
          rows={5}
          placeholder='Write a short summary about yourself, your experience and goals...'
          value={resumeData.professional_summary || ''}
          onChange={handleChange}
          style={{ resize: 'none' }}
        />
      </div>

      <button
        onClick={enhanceSummary}
        disabled={enhancing}
        className='flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-colors'
        style={{
          borderColor: 'var(--accent)',
          color: 'var(--accent)',
          opacity: enhancing ? 0.7 : 1
        }}>
        {enhancing
          ? <LoaderCircleIcon size={14} className='animate-spin' />
          : <SparklesIcon size={14} />}
        {enhancing ? 'Enhancing...' : 'Enhance with AI'}
      </button>
    </div>
  )
}

export default ProfessionalSummaryForm