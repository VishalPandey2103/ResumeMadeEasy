import { Lock, Mail, User2Icon } from 'lucide-react'
import React from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
  const dispatch = useDispatch()
  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
  const [state, setState] = React.useState(urlState || 'login')

  const [formData, setFormData] = React.useState({ name: '', email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post(`/api/users/${state}`, formData)
      dispatch(login(data))
      localStorage.setItem('token', data.token)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/">
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 600 }}>
              Resume<span style={{ color: 'var(--accent)' }}>MadeEasy</span>
            </span>
          </a>
        </div>

        <div className="rounded-xl p-8 border" style={{ background: 'white', borderColor: 'var(--border)' }}>
          <h1 className="text-xl font-semibold mb-1" style={{ color: 'var(--text)' }}>
            {state === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            {state === 'login' ? 'Sign in to your ResumeMadeEasy account' : 'Get started — it\'s free'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {state !== 'login' && (
              <div className="relative">
                <User2Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }} />
                <input type="text" name="name" placeholder="Full name"
                  className="w-full pl-9" value={formData.name}
                  onChange={handleChange} required />
              </div>
            )}
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }} />
              <input type="email" name="email" placeholder="Email address"
                className="w-full pl-9" value={formData.email}
                onChange={handleChange} required />
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }} />
              <input type="password" name="password" placeholder="Password"
                className="w-full pl-9" value={formData.password}
                onChange={handleChange} required />
            </div>

            <button type="submit"
              className="w-full py-2.5 rounded-md text-sm font-medium transition-colors mt-2"
              style={{ background: 'var(--text)', color: 'var(--bg)' }}>
              {state === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
            {state === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setState(prev => prev === 'login' ? 'register' : 'login')}
              className="font-medium hover:underline"
              style={{ color: 'var(--accent)' }}>
              {state === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
