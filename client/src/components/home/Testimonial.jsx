import React from 'react'
import Title from './Title.jsx'

const cards = [
  {
    img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
    name: 'Rohan Mehta',
    role: 'Software Engineer, Bangalore',
    text: 'The AI summary feature saved me hours. My recruiter actually mentioned my profile stood out.',
  },
  {
    img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    name: 'Priya Singh',
    role: 'Product Designer',
    text: 'Clean templates, fast to fill out. Got interview calls within a week of updating my resume here.',
  },
  {
    img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200',
    name: 'Karan Joshi',
    role: 'CS Student, IIT Delhi',
    text: 'Used it for campus placements. The export was crisp and formatted exactly right for HR portals.',
  },
  {
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
    name: 'Ananya Rao',
    role: 'Data Analyst',
    text: 'Switched from Canva resumes to this. Night and day difference in how professional it looks.',
  },
  {
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200',
    name: 'Arjun Das',
    role: 'Backend Developer',
    text: 'Took me 20 minutes to have a complete, polished resume. The AI bullet suggestions were spot-on.',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Simran Kaur',
    role: 'MBA Graduate',
    text: 'I had zero design sense. ResumeMadeEasy made me look like I hired a professional resume writer.',
  },
]

const Card = ({ card }) => (
  <div className="w-72 shrink-0 mx-3 rounded-xl p-5 border"
    style={{ background: 'white', borderColor: 'var(--border)' }}>
    <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text)' }}>
      "{card.text}"
    </p>
    <div className="flex items-center gap-3">
      <img src={card.img} className="w-9 h-9 rounded-full object-cover" alt={card.name} />
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{card.name}</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{card.role}</p>
      </div>
    </div>
  </div>
)

const Testimonial = () => {
  return (
    <div id="testimonials" className="scroll-mt-16 py-24 overflow-hidden"
      style={{ background: 'var(--bg)' }}>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Title
          tag="Reviews"
          title="Heard from the people using it"
        />
      </div>

      <div className="mt-12 space-y-4">
        {[false, true].map((reverse, ri) => (
          <div key={ri} className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
            <div className={`flex min-w-[200%] marquee-inner ${reverse ? 'marquee-reverse' : ''}`}>
              {[...cards, ...cards].map((card, i) => <Card key={i} card={card} />)}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial
