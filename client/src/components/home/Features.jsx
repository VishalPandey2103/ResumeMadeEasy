import React from 'react'
import Title from './Title.jsx'

const steps = [
  {
    num: '01',
    title: 'Fill in your details',
    desc: 'Guided forms for personal info, experience, education, projects, and skills. No formatting guesswork.',
    color: '#fef3c7',
  },
  {
    num: '02',
    title: 'Let AI sharpen the text',
    desc: 'One click makes your summary and job descriptions stronger, more specific, and ATS-friendly.',
    color: '#f0fdf4',
  },
  {
    num: '03',
    title: 'Pick a template and export',
    desc: 'Choose from five clean templates, adjust the accent color, and download a print-ready PDF.',
    color: '#eff6ff',
  },
]

const Features = () => {
  return (
    <div id="features" className="scroll-mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-24"
      style={{ background: 'var(--bg)' }}>

      <div className="max-w-5xl mx-auto">
        <Title
          tag="How it works"
          title="Three steps to a job-ready resume"
          description="No design skills needed. No subscription wall. Just a fast, straightforward tool that helps you put your best foot forward."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {steps.map((step) => (
            <div key={step.num}
              className="rounded-xl p-7 border"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
              <div className="text-xs font-mono font-bold mb-5 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: step.color, color: 'var(--text)' }}>
                {step.num}
              </div>
              <h3 className="font-medium text-base mb-2" style={{ color: 'var(--text)' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Templates preview strip */}
        <div className="mt-20">
          <p className="text-xs uppercase tracking-widest font-medium mb-6 text-center"
            style={{ color: 'var(--text-muted)' }}>
            Available templates
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Classic', 'Modern', 'Minimal', 'Academic', 'Minimal Image'].map(t => (
              <span key={t}
                className="px-4 py-1.5 rounded-full text-xs font-medium border"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'white' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
