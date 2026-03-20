import React from 'react'
import { UploadCloudIcon } from 'lucide-react'

const PersonalInfoForm = ({ resumeData, setResumeData, removeBackground, setRemoveBackground }) => {

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      personal_info: {
        ...resumeData.personal_info,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setResumeData({
        ...resumeData,
        personal_info: {
          ...resumeData.personal_info,
          image: file
        }
      })
    }
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-sm font-semibold' style={{ color: 'var(--text)' }}>
        Personal Information
      </h2>

      {/* Profile image upload */}
      <div>
        <label className='block text-xs mb-1.5' style={{ color: 'var(--text-muted)' }}>
          Profile Photo
        </label>
        <label htmlFor='profile-image' className='cursor-pointer'>
          <div className='border-2 border-dashed rounded-lg p-5 text-center transition-colors hover:border-amber-400'
            style={{ borderColor: resumeData.personal_info?.image ? 'var(--accent)' : 'var(--border)' }}>
            {resumeData.personal_info?.image ? (
              <p className='text-xs font-medium' style={{ color: 'var(--accent)' }}>
                {typeof resumeData.personal_info.image === 'string'
                  ? 'Image uploaded'
                  : resumeData.personal_info.image.name}
              </p>
            ) : (
              <>
                <UploadCloudIcon size={20} className='mx-auto mb-1' style={{ color: 'var(--text-muted)' }} />
                <p className='text-xs' style={{ color: 'var(--text-muted)' }}>Click to upload photo</p>
              </>
            )}
          </div>
        </label>
        <input id='profile-image' type='file' accept='image/*' hidden onChange={handleImageChange} />

        <label className='flex items-center gap-2 mt-2 cursor-pointer w-fit'>
          <input
            type='checkbox'
            checked={removeBackground}
            onChange={e => setRemoveBackground(e.target.checked)}
            className='w-3.5 h-3.5'
          />
          <span className='text-xs' style={{ color: 'var(--text-muted)' }}>
            Remove background (AI)
          </span>
        </label>
      </div>

      {/* Fields */}
      <div className='grid grid-cols-1 gap-3'>
        {[
          { label: 'Full Name', name: 'full_name', placeholder: 'John Doe' },
          { label: 'Profession', name: 'profession', placeholder: 'Software Engineer' },
          { label: 'Email', name: 'email', placeholder: 'john@example.com' },
          { label: 'Phone', name: 'phone', placeholder: '+91 98765 43210' },
          { label: 'Location', name: 'location', placeholder: 'Mumbai, India' },
          { label: 'LinkedIn', name: 'linkedin', placeholder: 'linkedin.com/in/johndoe' },
          { label: 'Website', name: 'website', placeholder: 'johndoe.com' },
        ].map(field => (
          <div key={field.name}>
            <label className='block text-xs mb-1' style={{ color: 'var(--text-muted)' }}>
              {field.label}
            </label>
            <input
              type='text'
              name={field.name}
              placeholder={field.placeholder}
              value={resumeData.personal_info?.[field.name] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PersonalInfoForm