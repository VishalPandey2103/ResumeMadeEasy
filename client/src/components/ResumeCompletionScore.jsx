import React, { useMemo } from 'react'

const calculateScore = (data) => {
  let score = 0
  const feedback = []

  // Personal Info — 20 pts
  const p = data.personal_info || {}
  if (p.full_name && p.email && p.phone) {
    score += 20
  } else {
    feedback.push('Add your name, email and phone')
  }

  // Professional Summary — 15 pts
  if (data.professional_summary && data.professional_summary.length > 50) {
    score += 15
  } else {
    feedback.push('Write a professional summary (50+ characters)')
  }

  // Experience — 20 pts
  const hasExp = data.experience?.some(e => e.company && e.position)
  if (hasExp) {
    score += 20
  } else {
    feedback.push('Add at least one work experience')
  }

  // Education — 15 pts
  const hasEdu = data.education?.some(e => e.institution && e.degree)
  if (hasEdu) {
    score += 15
  } else {
    feedback.push('Add your education details')
  }

  // Projects — 15 pts
  const hasProj = data.project?.some(p => p.name && p.description)
  if (hasProj) {
    score += 15
  } else {
    feedback.push('Add at least one project')
  }

  // Skills — 15 pts
  if (data.skills?.length >= 3) {
    score += 15
  } else {
    feedback.push('Add at least 3 skills')
  }

  return { score, feedback }
}

const ResumeCompletionScore = ({ data }) => {
  const { score, feedback } = useMemo(() => calculateScore(data), [data])

  const radius = 20
  const circumference = 2 * Math.PI * radius
  const filled = (score / 100) * circumference
  const color = score === 100 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#e5e7eb'
  const textColor = score === 100 ? '#22c55e' : score >= 60 ? '#f59e0b' : 'var(--text-muted)'

  return (
    <div className="flex items-center gap-2 group relative">

      {/* Ring */}
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
        <circle
          cx="22" cy="22" r={radius} fill="none"
          stroke={color} strokeWidth="3.5"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
          style={{ transition: 'stroke-dasharray 0.5s ease, stroke 0.3s ease' }}
        />
        <text x="22" y="26" textAnchor="middle" fontSize="9" fontWeight="700" fill={textColor}>
          {score}%
        </text>
      </svg>

      {/* Label */}
      <div>
        <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>
          {score === 100 ? 'Complete!' : 'Completion'}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {score === 100 ? 'Ready to share' : `${feedback.length} section${feedback.length > 1 ? 's' : ''} incomplete`}
        </p>
      </div>

      {/* Tooltip on hover — shows what's missing */}
      {score < 100 && (
        <div
          className="absolute left-0 top-12 z-10 w-56 rounded-lg border p-3 shadow-md hidden group-hover:block"
          style={{ background: 'white', borderColor: 'var(--border)' }}>
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text)' }}>
            What's missing:
          </p>
          <ul className="space-y-1">
            {feedback.map((f, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-xs mt-0.5" style={{ color: '#ef4444' }}>•</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  )
}

export default ResumeCompletionScore