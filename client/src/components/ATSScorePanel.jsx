import { Loader2, Target, CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

// Circular SVG score gauge — same pattern you'd use for ATS systems
const ScoreGauge = ({ score }) => {
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const filled = (score / 100) * circumference
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444'
  const label = score >= 75 ? 'Strong' : score >= 50 ? 'Fair' : 'Weak'

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="7" />
        <circle
          cx="48" cy="48" r={radius} fill="none"
          stroke={color} strokeWidth="7"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 48 48)"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
        <text x="48" y="44" textAnchor="middle" fontSize="19" fontWeight="700" fill={color}>{score}</text>
        <text x="48" y="58" textAnchor="middle" fontSize="9" fill="#9ca3af">/100</text>
      </svg>
      <span className="text-xs font-semibold" style={{ color }}>{label} match</span>
    </div>
  )
}

// Keyword chip — green for matched, red for missing
const Chip = ({ label, matched }) => (
  <span
    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
    style={{
      background: matched ? '#f0fdf4' : '#fef2f2',
      color: matched ? '#166534' : '#991b1b',
      border: `1px solid ${matched ? '#bbf7d0' : '#fecaca'}`
    }}>
    {matched
      ? <CheckCircle2 size={10} />
      : <XCircle size={10} />}
    {label}
  </span>
)

// Collapsible section feedback row
const FeedbackRow = ({ section, text }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-lg border" style={{ borderColor: 'var(--border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left"
      >
        <span className="text-xs font-semibold capitalize" style={{ color: 'var(--text)' }}>{section}</span>
        {open ? <ChevronUp size={13} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={13} style={{ color: 'var(--text-muted)' }} />}
      </button>
      {open && (
        <p className="px-3 pb-3 text-xs leading-relaxed" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
          {text}
        </p>
      )}
    </div>
  )
}

const ATSScorePanel = ({ resumeData }) => {
  const { token } = useSelector(state => state.auth)
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyze = async () => {
    if (!jobDescription.trim()) {
      toast.error('Paste a job description first')
      return
    }
    try {
      setIsAnalyzing(true)
      const { data } = await api.post(
        '/api/ai/ats-score',
        { resumeData, jobDescription },
        { headers: { Authorization: token } }
      )
      setResult(data)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-4">

      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text)' }}>
          <Target size={14} /> ATS Score Checker
        </h3>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Paste a job description to see how well your resume matches it
        </p>
      </div>

      {/* JD Input */}
      <textarea
        value={jobDescription}
        onChange={e => setJobDescription(e.target.value)}
        rows={6}
        placeholder="Paste the job description here…"
        style={{ fontSize: '12px' }}
      />

      <button
        onClick={analyze}
        disabled={isAnalyzing}
        className="w-full py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
        style={{ background: 'var(--text)', color: 'white' }}>
        {isAnalyzing
          ? <><Loader2 size={13} className="animate-spin" /> Analyzing…</>
          : <><Target size={13} /> Analyze Match</>}
      </button>

      {/* Results */}
      {result && (
        <div className="space-y-4 pt-2">

          {/* Score gauge */}
          <div className="flex justify-center py-2">
            <ScoreGauge score={result.score} />
          </div>

          <div style={{ borderTop: '1px solid var(--border)' }} />

          {/* Keywords */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Matched Keywords ({result.matched_keywords?.length || 0})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.matched_keywords?.map(k => <Chip key={k} label={k} matched={true} />)}
              {(!result.matched_keywords || result.matched_keywords.length === 0) && (
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>None found</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Missing Keywords ({result.missing_keywords?.length || 0})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.missing_keywords?.map(k => <Chip key={k} label={k} matched={false} />)}
              {(!result.missing_keywords || result.missing_keywords.length === 0) && (
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Great — no gaps found!</p>
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)' }} />

          {/* Section feedback */}
          {result.section_feedback && (
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text)' }}>Section Feedback</p>
              <div className="space-y-1.5">
                {Object.entries(result.section_feedback).map(([section, text]) => (
                  <FeedbackRow key={section} section={section} text={text} />
                ))}
              </div>
            </div>
          )}

          {/* Top suggestions */}
          {result.top_suggestions?.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text)' }}>
                <AlertCircle size={11} className="inline mr-1" />
                Top Suggestions
              </p>
              <ul className="space-y-2">
                {result.top_suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-xs font-bold mt-0.5" style={{ color: 'var(--accent)', minWidth: '14px' }}>{i + 1}.</span>
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default ATSScorePanel