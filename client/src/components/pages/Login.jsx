import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../app/features/authSlice'
import api from '../configs/api'
import toast from 'react-hot-toast'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const endpoint = isLogin ? '/api/users/login' : '/api/users/register'
      const payload = isLogin ? { email, password } : { name, email, password }

      const { data } = await api.post(endpoint, payload)

      localStorage.setItem('token', data.token)
      dispatch(login({ token: data.token, user: data.user }))
      toast.success(data.message)
      navigate('/app')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setLoading(false)
  }

  return (
    <div className='w-full h-screen flex items-center justify-center px-4'
      style={{ background: 'var(--bg-muted)' }}>
      <div className='w-full max-w-sm rounded-xl p-8 border'
        style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>

        <h1 className='text-xl font-semibold mb-1' style={{ color: 'var(--text)' }}>
          {isLogin ? 'Welcome back' : 'Create account'}
        </h1>
        <p className='text-sm mb-6' style={{ color: 'var(--text-muted)' }}>
          {isLogin ? 'Login to access your resumes' : 'Sign up to get started'}
        </p>

        <form onSubmit={handleSubmit} className='space-y-3'>
          {!isLogin && (
            <input
              type='text'
              placeholder='Full name'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          )}
          <input
            type='email'
            placeholder='Email address'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type='submit'
            disabled={loading}
            className='w-full py-2.5 rounded-md text-sm font-medium mt-1 transition-colors'
            style={{ background: 'var(--text)', color: 'white', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create account'}
          </button>
        </form>

        <p className='text-sm text-center mt-5' style={{ color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className='font-medium'
            style={{ color: 'var(--text)' }}>
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login