import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResumePreview from '../ResumePreview.jsx'
import Loader from '../Loader.jsx'
import { ArrowLeftIcon, DownloadIcon } from 'lucide-react'
import api from '../../configs/api.js'

const Preview = () => {
  const { resumeId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/public/' + resumeId)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { loadResume() }, [])

  if (isLoading) return <Loader />

  if (!resumeData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: 'var(--bg)' }}>
        <p className="text-5xl font-medium" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-muted)' }}>
          Resume not found
        </p>
        <a href="/"
          className="flex items-center gap-2 text-sm px-5 py-2 rounded-md"
          style={{ background: 'var(--text)', color: 'white' }}>
          <ArrowLeftIcon size={14} /> Go home
        </a>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header bar */}
      <div className="px-6 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)', background: 'white' }}>
        <a href="/">
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.1rem' }}>
            Resume<span style={{ color: 'var(--accent)' }}>MadeEasy</span>
          </span>
        </a>
        <button onClick={() => window.print()}
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-md"
          style={{ background: 'var(--accent)', color: 'white' }}>
          <DownloadIcon size={14} /> Download
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <ResumePreview data={resumeData} template={resumeData.template}
          accentColor={resumeData.accent_color} classes="bg-white" />
      </div>
    </div>
  )
}

export default Preview
