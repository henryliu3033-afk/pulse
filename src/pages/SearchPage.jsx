import { useSearchParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useSearch } from '../hooks/useArticles'
import { ArticleCard } from '../components/article/ArticleCard'
import { SkeletonCard } from '../components/ui/SkeletonCard'

export default function SearchPage() {
  const [sp]          = useSearchParams()
  const initialQ      = sp.get('q') || ''
  const [query, setQ] = useState(initialQ)
  const navigate      = useNavigate()
  const { data, loading } = useSearch(query)

  useEffect(() => { setQ(sp.get('q') || '') }, [sp])

  const handleSubmit = e => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="page-enter pt-[60px]">
      <div style={{ background:'var(--bg-2)', borderBottom:'1px solid var(--bd)' }}>
        <div className="wrap py-10 md:py-14 max-w-2xl mx-auto">
          <p className="font-mono text-xs mb-3" style={{ color:'var(--em)' }}>// 搜尋文章</p>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input value={query} onChange={e => setQ(e.target.value)}
              placeholder="輸入關鍵字或標籤…"
              className="search-input flex-1 px-4 py-3 text-base" />
            <button type="submit"
              className="px-6 py-3 font-mono text-sm font-medium rounded-[var(--r-lg)] cursor-pointer transition-all"
              style={{ background:'var(--em)', color:'var(--bg)' }}
              onMouseEnter={e => e.currentTarget.style.background='var(--em-dk)'}
              onMouseLeave={e => e.currentTarget.style.background='var(--em)'}>
              搜尋
            </button>
          </form>
        </div>
      </div>

      <div className="wrap py-8 md:py-12">
        {query.length >= 2 && (
          <p className="font-mono text-xs mb-6" style={{ color:'var(--tx-3)' }}>
            {loading ? '搜尋中…' : `找到 ${data?.length || 0} 篇關於「${query}」的文章`}
          </p>
        )}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_,i) => <SkeletonCard key={i} />)}
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
          </div>
        ) : query.length >= 2 ? (
          <div className="text-center py-20">
            <p className="font-mono text-4xl mb-4" style={{ color:'var(--bg-4)' }}>{'{ }'}</p>
            <p className="font-mono text-sm" style={{ color:'var(--tx-3)' }}>// 找不到相符的結果</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-mono text-sm" style={{ color:'var(--tx-3)' }}>// 輸入至少 2 個字元開始搜尋</p>
          </div>
        )}
      </div>
    </div>
  )
}
