import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon, UploadCloud } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../../configs/api.js'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const cardColors = [
  { bg: '#fef9ee', border: '#fde68a', text: '#92400e' },
  { bg: '#f0fdf4', border: '#bbf7d0', text: '#14532d' },
  { bg: '#eff6ff', border: '#bfdbfe', text: '#1e3a5f' },
  { bg: '#fdf4ff', border: '#e9d5ff', text: '#581c87' },
  { bg: '#fff7ed', border: '#fed7aa', text: '#7c2d12' },
]

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
    style={{ background: 'rgba(0,0,0,0.4)' }}
    onClick={onClose}>
    <div className="w-full max-w-sm rounded-xl p-7 relative"
      style={{ background: 'white', border: '1px solid var(--border)' }}
      onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100 transition-colors">
        <XIcon size={16} style={{ color: 'var(--text-muted)' }} />
      </button>
      <h2 className="font-semibold text-base mb-5" style={{ color: 'var(--text)' }}>{title}</h2>
      {children}
    </div>
  </div>
)

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      console.log('RESUME TEXT:', resumeText?.slice(0, 200))
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(r => r._id === editResumeId ? { ...r, title } : r))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    if (!window.confirm('Delete this resume?')) return
    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
      setAllResumes(allResumes.filter(r => r._id !== resumeId))
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => { loadAllResumes() }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>
          Good to see you, {user?.name?.split(' ')[0]}.
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {allResumes.length === 0
            ? 'Create your first resume to get started.'
            : `You have ${allResumes.length} resume${allResumes.length > 1 ? 's' : ''}.`}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          onClick={() => setShowCreateResume(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium border transition-colors"
          style={{ background: 'var(--text)', color: 'white', border: 'none' }}>
          <PlusIcon size={15} /> New resume
        </button>
        <button
          onClick={() => setShowUploadResume(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium border transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'white' }}>
          <UploadCloudIcon size={15} /> Import from PDF
        </button>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', marginBottom: '2rem' }} />

      {/* Resume grid */}
      {allResumes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">📄</p>
          <p className="font-medium" style={{ color: 'var(--text)' }}>No resumes yet</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Hit "New resume" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {allResumes.map((r, i) => {
            const c = cardColors[i % cardColors.length]
            return (
              <button key={r._id}
                onClick={() => navigate(`/app/builder/${r._id}`)}
                className="relative group text-left rounded-xl border p-4 h-44 flex flex-col justify-between transition-all hover:shadow-md"
                style={{ background: c.bg, borderColor: c.border }}>
                <div>
                  <FilePenLineIcon size={18} style={{ color: c.text }} />
                </div>
                <div>
                  <p className="text-sm font-medium leading-snug line-clamp-2" style={{ color: c.text }}>
                    {r.title}
                  </p>
                  <p className="text-xs mt-1" style={{ color: c.text, opacity: 0.6 }}>
                    {new Date(r.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>

                {/* action icons */}
                <div
                  className="absolute top-2 right-2 hidden group-hover:flex gap-1"
                  onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => { setEditResumeId(r._id); setTitle(r.title) }}
                    className="p-1.5 rounded hover:bg-white/60 transition-colors">
                    <PencilIcon size={13} style={{ color: c.text }} />
                  </button>
                  <button
                    onClick={() => deleteResume(r._id)}
                    className="p-1.5 rounded hover:bg-white/60 transition-colors">
                    <TrashIcon size={13} style={{ color: '#dc2626' }} />
                  </button>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Modals */}
      {showCreateResume && (
        <Modal title="New resume" onClose={() => { setShowCreateResume(false); setTitle('') }}>
          <form onSubmit={createResume} className="space-y-3">
            <input type="text" placeholder="Resume title" value={title}
              onChange={e => setTitle(e.target.value)} required className="w-full" />
            <button type="submit" className="w-full py-2.5 rounded-md text-sm font-medium"
              style={{ background: 'var(--text)', color: 'white' }}>
              Create resume
            </button>
          </form>
        </Modal>
      )}

      {showUploadResume && (
        <Modal title="Import existing resume" onClose={() => { setShowUploadResume(false); setTitle('') }}>
          <form onSubmit={uploadResume} className="space-y-3">
            <input type="text" placeholder="Give it a title" value={title}
              onChange={e => setTitle(e.target.value)} required className="w-full" />
            <label htmlFor="resume-input" className="block cursor-pointer">
              <div className="border-2 border-dashed rounded-lg p-6 text-center transition-colors hover:border-amber-400"
                style={{ borderColor: resume ? 'var(--accent)' : 'var(--border)' }}>
                {resume ? (
                  <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{resume.name}</p>
                ) : (
                  <>
                    <UploadCloud size={24} className="mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Click to upload PDF</p>
                  </>
                )}
              </div>
            </label>
            <input id="resume-input" type="file" accept=".pdf" hidden onChange={e => setResume(e.target.files[0])} />
            <button type="submit" disabled={isLoading}
              className="w-full py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2"
              style={{ background: 'var(--text)', color: 'white', opacity: isLoading ? 0.7 : 1 }}>
              {isLoading && <LoaderCircleIcon size={14} className="animate-spin" />}
              {isLoading ? 'Processing...' : 'Import resume'}
            </button>
          </form>
        </Modal>
      )}

      {editResumeId && (
        <Modal title="Rename resume" onClose={() => { setEditResumeId(''); setTitle('') }}>
          <form onSubmit={editTitle} className="space-y-3">
            <input type="text" placeholder="New title" value={title}
              onChange={e => setTitle(e.target.value)} required className="w-full" />
            <button type="submit" className="w-full py-2.5 rounded-md text-sm font-medium"
              style={{ background: 'var(--text)', color: 'white' }}>
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default Dashboard
