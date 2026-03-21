import React from 'react'

const Banner = () => {
  return (
    <div className="w-full py-2 text-center text-xs font-medium tracking-wide"
      style={{ background: '#1a1a1a', color: '#fef3c7' }}>
      ✦ AI-powered resume enhancement now available — &nbsp;
      <a href="/app" className="underline underline-offset-2 hover:text-amber-300 transition-colors">
        Try it free
      </a>
    </div>
  )
}

export default Banner
