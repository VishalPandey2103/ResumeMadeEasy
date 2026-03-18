import React from 'react'
import { SparklesIcon, LayoutTemplateIcon, ShareIcon } from 'lucide-react'

const features = [
  {
    icon: SparklesIcon,
    title: 'AI Enhancement',
    description: 'Let AI rewrite your summary and job descriptions to be ATS-friendly and compelling.'
  },
  {
    icon: LayoutTemplateIcon,
    title: 'Multiple Templates',
    description: 'Choose from Classic, Modern, Minimal, Academic and more professionally designed templates.'
  },
  {
    icon: ShareIcon,
    title: 'Share Instantly',
    description: 'Make your resume public and share it with a single link. No downloads needed.'
  }
]

const Features = () => {
  return (
    <section className='w-full py-16 px-6'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-2xl font-semibold text-center mb-10'
          style={{ color: 'var(--text)' }}>
          Everything you need to land the job
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {features.map((f, i) => (
            <div key={i} className='p-6 rounded-xl border'
              style={{ borderColor: 'var(--border)', background: 'var(--bg-muted)' }}>
              <f.icon size={20} style={{ color: 'var(--accent)' }} className='mb-3' />
              <h3 className='font-medium text-sm mb-1' style={{ color: 'var(--text)' }}>
                {f.title}
              </h3>
              <p className='text-sm' style={{ color: 'var(--text-muted)' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features