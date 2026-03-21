import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const Label = ({ children }) => (
  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
    {children}
  </label>
)

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
  const handleChange = (field, value) => onChange({ ...data, [field]: value })

  const fields = [
    { key: 'full_name',  label: 'Full Name',         icon: User,            type: 'text',  required: true },
    { key: 'profession', label: 'Profession / Title', icon: BriefcaseBusiness, type: 'text' },
    { key: 'email',      label: 'Email',              icon: Mail,            type: 'email', required: true },
    { key: 'phone',      label: 'Phone',              icon: Phone,           type: 'tel' },
    { key: 'location',   label: 'Location',           icon: MapPin,          type: 'text' },
    { key: 'linkedin',   label: 'LinkedIn',           icon: Linkedin,        type: 'url' },
    { key: 'website',    label: 'Website',            icon: Globe,           type: 'url' },
  ]

  return (
    <div>
      <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Personal Info</h3>
      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Your basic contact and identity details</p>

      {/* Photo upload */}
      <div className="flex items-center gap-3 mb-5 p-3 rounded-lg border"
        style={{ borderColor: 'var(--border)', background: '#fafaf9' }}>
        <label className="cursor-pointer">
          {data.image ? (
            <img
              src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
              className="w-12 h-12 rounded-full object-cover border-2"
              style={{ borderColor: 'var(--border)' }} />
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center transition-colors hover:border-amber-400"
              style={{ borderColor: 'var(--border)' }}>
              <User size={16} style={{ color: 'var(--text-muted)' }} />
            </div>
          )}
          <input type="file" accept="image/jpeg,image/png" className="hidden"
            onChange={e => handleChange('image', e.target.files[0])} />
        </label>
        <div>
          <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>Profile photo</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Click to upload (optional)</p>
          {typeof data.image === 'object' && (
            <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only peer"
                  onChange={() => setRemoveBackground(p => !p)} checked={removeBackground} />
                <div className="w-8 h-4 rounded-full transition-colors"
                  style={{ background: removeBackground ? 'var(--accent)' : 'var(--border)' }} />
                <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform"
                  style={{ transform: removeBackground ? 'translateX(16px)' : 'translateX(0)' }} />
              </div>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Remove background</span>
            </label>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        {fields.map(field => {
          const Icon = field.icon
          return (
            <div key={field.key}>
              <Label>
                <span className="flex items-center gap-1.5">
                  <Icon size={12} /> {field.label} {field.required && <span style={{ color: 'var(--accent)' }}>*</span>}
                </span>
              </Label>
              <input
                type={field.type}
                value={data[field.key] || ''}
                onChange={e => handleChange(field.key, e.target.value)}
                placeholder={field.label}
                required={field.required}
                className="w-full" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PersonalInfoForm
