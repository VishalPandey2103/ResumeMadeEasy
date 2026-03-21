import { Check, Palette } from 'lucide-react'
import React, { useState } from 'react'

const colors = [
  { name: 'Slate',   value: '#334155' },
  { name: 'Blue',    value: '#2563eb' },
  { name: 'Indigo',  value: '#4f46e5' },
  { name: 'Amber',   value: '#d97706' },
  { name: 'Teal',    value: '#0d9488' },
  { name: 'Green',   value: '#16a34a' },
  { name: 'Rose',    value: '#e11d48' },
  { name: 'Stone',   value: '#78716c' },
  { name: 'Sky',     value: '#0284c7' },
  { name: 'Violet',  value: '#7c3aed' },
]

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border transition-colors"
        style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'white' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: selectedColor }} />
        Accent
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 z-20 rounded-xl border p-3 shadow-lg"
          style={{ background: 'white', borderColor: 'var(--border)', width: '180px' }}>
          <p className="text-xs mb-2 font-medium" style={{ color: 'var(--text-muted)' }}>Accent color</p>
          <div className="grid grid-cols-5 gap-2">
            {colors.map(c => (
              <button key={c.value}
                title={c.name}
                onClick={() => { onChange(c.value); setIsOpen(false) }}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ background: c.value, outline: selectedColor === c.value ? `2px solid ${c.value}` : 'none', outlineOffset: '2px' }}>
                {selectedColor === c.value && <Check size={11} color="white" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPicker
