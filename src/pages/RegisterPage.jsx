import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { register } from '../lib/api'
import { useAuthStore } from '../store/auth.store'

export default function RegisterPage() {
  const navigate = useNavigate()
  const setAuth  = useAuthStore(s => s.setAuth)

  const [form,    setForm]    = useState({ name: '', email: '', password: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      // 註冊成功後直接導到登入頁
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '80px' }}>
      <div className="card w-full max-w-md p-8">
        <h1 className="font-mono font-bold text-2xl mb-2 grad-text">建立帳號</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--tx-2)' }}>加入 Pulse，同步你的書籤與閱讀紀錄</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs" style={{ color: 'var(--tx-2)' }}>名稱</label>
            <input name="name" value={form.name} onChange={handleChange} required
              placeholder="Henry"
              className="search-input px-4 py-2.5 text-sm" />
          </div>

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
            {loading ? '註冊中...' : '註冊'}
          </button>
        </form>

        <p className="text-sm text-center mt-6" style={{ color: 'var(--tx-2)' }}>
          已有帳號？{' '}
          <Link to="/login" style={{ color: 'var(--em)' }}>登入</Link>
        </p>
      </div>
    </div>
  )
}
