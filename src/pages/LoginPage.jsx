import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { login } from '../lib/api'
import { useAuthStore } from '../store/auth.store'
import { useReaderStore } from '../store/reader.store'

export default function LoginPage() {
  const navigate = useNavigate()
  const setAuth  = useAuthStore(s => s.setAuth)

  const [form,    setForm]    = useState({ email: '', password: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const fetchBookmarks = useReaderStore(s => s.fetchBookmarks)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await login(form)
      setAuth(data.user, data.access_token)
      await fetchBookmarks(data.access_token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '80px' }}>
      <div className="card w-full max-w-md p-8">
        <h1 className="font-mono font-bold text-2xl mb-2 grad-text">登入</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--tx-2)' }}>歡迎回來，繼續你的閱讀旅程</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs" style={{ color: 'var(--tx-2)' }}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required
              placeholder="henry@gmail.com"
              className="search-input px-4 py-2.5 text-sm" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs" style={{ color: 'var(--tx-2)' }}>密碼</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required
              placeholder="••••••••"
              className="search-input px-4 py-2.5 text-sm" />
          </div>

          {error && (
            <p className="text-sm px-4 py-2.5 rounded-[var(--r)]"
              style={{ color: '#F87171', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="mt-2 py-2.5 font-mono font-medium text-sm rounded-[var(--r)] transition-all cursor-pointer"
            style={{ background: 'var(--em)', color: 'var(--bg)', opacity: loading ? 0.7 : 1 }}>
            {loading ? '登入中...' : '登入'}
          </button>
        </form>

        <p className="text-sm text-center mt-6" style={{ color: 'var(--tx-2)' }}>
          還沒有帳號？{' '}
          <Link to="/register" style={{ color: 'var(--em)' }}>註冊</Link>
        </p>
      </div>
    </div>
  )
}
