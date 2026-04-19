import React, { useEffect, useState } from 'react'
import ATSScorePanel from '../ATSScorePanel.jsx'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../PersonalInfoForm.jsx'
import ResumePreview from '../ResumePreview.jsx'
import TemplateSelector from '../TemplateSelector.jsx'
import ColorPicker from '../ColorPicker.jsx'
import ProfessionalSummaryForm from '../ProfessionalSummaryForm.jsx'
import ExperienceForm from '../ExperienceForm.jsx'
import EducationForm from '../EducationForm.jsx'
import ProjectForm from '../ProjectForm.jsx'
import SkillsForm from '../SkillsForm.jsx'
import { useSelector } from 'react-redux'
import api from '../../configs/api.js'
import toast from 'react-hot-toast'
import ResumeCompletionScore from '../ResumeCompletionScore.jsx'


const sections = [
  { id: 'personal', name: 'Personal', icon: User },
  { id: 'summary', name: 'Summary', icon: FileText },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'projects', name: 'Projects', icon: FolderIcon },
  { id: 'skills', name: 'Skills', icon: Sparkles },
]

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '', title: '',
    personal_info: {},
    professional_summary: '',
    experience: [], education: [], project: [], skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [rightTab, setRightTab] = useState('preview')

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title + ' — ResumeMadeEasy'
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => { loadExistingResume() }, [])

  const saveResume = async () => {
    let updatedResumeData = structuredClone(resumeData)
    if (typeof resumeData.personal_info.image === 'object') {
      delete updatedResumeData.personal_info.image
    }
    const formData = new FormData()
    formData.append('resumeId', resumeId)
    formData.append('resumeData', JSON.stringify(updatedResumeData))
    removeBackground && formData.append('removeBackground', 'yes')
    typeof resumeData.personal_info.image === 'object' && formData.append('image', resumeData.personal_info.image)

    const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
    setResumeData(data.resume)
    return data
  }

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append('resumeData', JSON.stringify({ public: !resumeData.public }))
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) {
      console.error(error)
    }
  }

  const handleShare = () => {
    const base = window.location.href.split('/app/')[0]
    const url = base + '/view/' + resumeId
    if (navigator.share) {
      navigator.share({ url, text: 'My Resume' })
    } else {
      navigator.clipboard.writeText(url)
      toast.success('Link copied!')
    }
  }

  const activeSection = sections[activeSectionIndex]
  const progress = activeSectionIndex / (sections.length - 1)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-6 py-5">
        <Link to="/app" className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-amber-600"
          style={{ color: 'var(--text-muted)' }}>
          <ArrowLeftIcon size={14} /> Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left — Form panel */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border overflow-hidden"
              style={{ background: 'white', borderColor: 'var(--border)' }}>

              {/* Progress bar */}
              <div className="h-0.5" style={{ background: 'var(--border)' }}>
                <div className="h-full transition-all duration-500"
                  style={{ width: `${progress * 100}%`, background: 'var(--accent)' }} />
              </div>

              <div className="p-5">
                {/* Completion score */}
                <div className="mb-4">
                  <ResumeCompletionScore data={resumeData} />
                </div>

                {/* Section tabs */}
                <div className="flex gap-1 flex-wrap mb-5">
                  {sections.map((s, i) => {
                    const Icon = s.icon
                    return (
                      <button key={s.id}
                        onClick={() => setActiveSectionIndex(i)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
                        style={{
                          background: activeSectionIndex === i ? '#1a1a1a' : 'transparent',
                          color: activeSectionIndex === i ? 'white' : 'var(--text-muted)',
                        }}>
                        <Icon size={12} />
                        {s.name}
                      </button>
                    )
                  })}
                </div>

                {/* Template + color row */}
                <div className="flex items-center gap-2 pb-4 mb-4"
                  style={{ borderBottom: '1px solid var(--border)' }}>
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={t => setResumeData(prev => ({ ...prev, template: t }))} />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={c => setResumeData(prev => ({ ...prev, accent_color: c }))} />
                </div>

                {/* Form content */}
                <div className="fade-up" key={activeSection.id}>
                  {activeSection.id === 'personal' && (
                    <PersonalInfoForm data={resumeData.personal_info}
                      onChange={d => setResumeData(prev => ({ ...prev, personal_info: d }))}
                      removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                  )}
                  {activeSection.id === 'summary' && (
                    <ProfessionalSummaryForm data={resumeData.professional_summary}
                      onChange={d => setResumeData(prev => ({ ...prev, professional_summary: d }))}
                      setResumeData={setResumeData} />
                  )}
                  {activeSection.id === 'experience' && (
                    <ExperienceForm data={resumeData.experience}
                      onChange={d => setResumeData(prev => ({ ...prev, experience: d }))} />
                  )}
                  {activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education}
                      onChange={d => setResumeData(prev => ({ ...prev, education: d }))} />
                  )}
                  {activeSection.id === 'projects' && (
                    <ProjectForm data={resumeData.project}
                      onChange={d => setResumeData(prev => ({ ...prev, project: d }))} />
                  )}
                  {activeSection.id === 'skills' && (
                    <SkillsForm data={resumeData.skills}
                      onChange={d => setResumeData(prev => ({ ...prev, skills: d }))} />
                  )}
                </div>

                {/* Nav + save row */}
                <div className="flex items-center justify-between mt-6 pt-4"
                  style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setActiveSectionIndex(i => Math.max(i - 1, 0))}
                      disabled={activeSectionIndex === 0}
                      className="p-2 rounded-md text-xs flex items-center gap-1 transition-colors disabled:opacity-30"
                      style={{ color: 'var(--text-muted)' }}>
                      <ChevronLeft size={14} /> Prev
                    </button>
                    <button
                      onClick={() => setActiveSectionIndex(i => Math.min(i + 1, sections.length - 1))}
                      disabled={activeSectionIndex === sections.length - 1}
                      className="p-2 rounded-md text-xs flex items-center gap-1 transition-colors disabled:opacity-30"
                      style={{ color: 'var(--text-muted)' }}>
                      Next <ChevronRight size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => toast.promise(saveResume(), {
                      loading: 'Saving…',
                      success: 'Saved',
                      error: 'Failed to save'
                    })}
                    className="px-5 py-2 rounded-md text-sm font-medium transition-colors"
                    style={{ background: 'var(--text)', color: 'white' }}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Preview */}
          {/* Right — Preview + ATS */}
          <div className="lg:col-span-7">

            {/* Tab switcher + action bar */}
            <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">

              {/* Tabs */}
              <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--border)' }}>
                <button
                  onClick={() => setRightTab('preview')}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                  style={{
                    background: rightTab === 'preview' ? 'white' : 'transparent',
                    color: rightTab === 'preview' ? 'var(--text)' : 'var(--text-muted)',
                    boxShadow: rightTab === 'preview' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                  }}>
                  Preview
                </button>
                <button
                  onClick={() => setRightTab('ats')}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                  style={{
                    background: rightTab === 'ats' ? 'white' : 'transparent',
                    color: rightTab === 'ats' ? 'var(--text)' : 'var(--text-muted)',
                    boxShadow: rightTab === 'ats' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                  }}>
                  ATS Score
                </button>
              </div>

              {/* Action buttons — only visible on preview tab */}
              {rightTab === 'preview' && (
                <div className="flex items-center gap-2 flex-wrap">
                  {resumeData.public && (
                    <button onClick={handleShare}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs border transition-colors"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'white' }}>
                      <Share2Icon size={13} /> Share
                    </button>
                  )}
                  <button onClick={changeResumeVisibility}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs border transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'white' }}>
                    {resumeData.public ? <EyeIcon size={13} /> : <EyeOffIcon size={13} />}
                    {resumeData.public ? 'Public' : 'Private'}
                  </button>
                  <button onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium transition-colors"
                    style={{ background: 'var(--accent)', color: 'white' }}>
                    <DownloadIcon size={13} /> Download PDF
                  </button>
                </div>
              )}
            </div>

            {/* Tab content */}
            {rightTab === 'preview' ? (
              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
            ) : (
              <div className="rounded-xl border p-5 overflow-y-auto" style={{ background: 'white', borderColor: 'var(--border)', maxHeight: '85vh' }}>
                <ATSScorePanel resumeData={resumeData} />
              </div>
            )}

          </div>


        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
