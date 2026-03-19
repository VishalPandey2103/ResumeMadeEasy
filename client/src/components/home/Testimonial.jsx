import React from 'react'
import Title from './Title'

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Software Engineer at Infosys',
    text: 'ResumeMadeEasy helped me land my first job. The AI enhancement feature made my resume stand out instantly.'
  },
  {
    name: 'Priya Mehta',
    role: 'Product Manager at Flipkart',
    text: 'I loved how easy it was to switch templates without losing my data. Got interview calls within a week.'
  },
  {
    name: 'Arjun Verma',
    role: 'Frontend Developer at Razorpay',
    text: 'The public share link feature is brilliant. Sent my resume link directly in emails instead of attachments.'
  }
]

const Testimonial = () => {
  return (
    <section className='w-full py-16 px-6'>
      <div className='max-w-4xl mx-auto'>
        <Title
          title='What our users say'
          subtitle='Thousands of job seekers have built their resumes with us'
        />

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {testimonials.map((t, i) => (
            <div key={i} className='p-6 rounded-xl border'
              style={{ borderColor: 'var(--border)', background: 'var(--bg-muted)' }}>
              <p className='text-sm mb-4' style={{ color: 'var(--text-muted)' }}>
                "{t.text}"
              </p>
              <p className='text-sm font-medium' style={{ color: 'var(--text)' }}>
                {t.name}
              </p>
              <p className='text-xs mt-0.5' style={{ color: 'var(--text-muted)' }}>
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial