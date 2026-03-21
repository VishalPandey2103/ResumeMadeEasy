import { Check, LayoutTemplate } from 'lucide-react'
import React, { useState } from 'react'

const templates = [
  { id: 'classic', name: 'Classic', desc: 'Clean, traditional two-column layout' },
  { id: 'academic', name: 'Academic', desc: 'Single-column with emphasis on education' },
  { id: 'modern', name: 'Modern', desc: 'Bold header with accent sidebar' },
  { id: 'minimal', name: 'Minimal', desc: 'Ultra-clean, content-first' },
  { id: 'minimal-image', name: 'Minimal + Photo', desc: 'Minimal with profile image' },
]

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border transition-colors"
        style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'white' }}>
        <LayoutTemplate size={13} /> Template
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 z-20 w-56 rounded-xl border p-2 shadow-lg"
          style={{ background: 'white', borderColor: 'var(--border)' }}>
          {templates.map(t => (
            <button key={t.id}
              onClick={() => { onChange(t.id); setIsOpen(false) }}
              className="w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors hover:bg-gray-50"
              style={{
                background: selectedTemplate === t.id ? '#fef9ee' : undefined,
              }}>
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>{t.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.desc}</p>
              </div>
              {selectedTemplate === t.id && (
                <div className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--accent)' }}>
                  <Check size={9} color="white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TemplateSelector
