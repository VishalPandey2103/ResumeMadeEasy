import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api.js'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      setIsGenerating(true)
      const prompt = `enhance my professional summary "${data}"`
      const response = await api.post('/api/ai/enhance-pro-sum', { userContent: prompt }, { headers: { Authorization: token } })
      setResumeData(prev => ({ ...prev, professional_summary: response.data.enhancedContent }))
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Professional Summary</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>2–3 sentences about your background and goals</p>
        </div>
        <button
          onClick={generateSummary}
          disabled={isGenerating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors disabled:opacity-50"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'white' }}>
          {isGenerating
            ? <><Loader2 size={12} className="animate-spin" /> Enhancing…</>
            : <><Sparkles size={12} /> AI Enhance</>}
        </button>
      </div>

      <textarea
        value={data || ''}
        onChange={e => onChange(e.target.value)}
        rows={7}
        placeholder="Experienced software engineer with a focus on backend systems and distributed architecture..." />

      <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
        Write something rough, then hit AI Enhance to polish it.
      </p>
    </div>
  )
}

export default ProfessionalSummaryForm
