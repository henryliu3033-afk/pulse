import { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { useArticle, useLatestArticles } from '../hooks/useArticles'
import { useReaderStore } from '../store/reader.store'
import { fDate } from '../lib/devto'
import { ArticleCard } from '../components/article/ArticleCard'
import { SkeletonCard } from '../components/ui/SkeletonCard'

function ReadingProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      if (barRef.current) barRef.current.style.width = `${Math.min(pct, 100)}%`
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div id="read-progress" ref={barRef} style={{ width:'0%' }} />
}

export default function ArticlePage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { data: article, loading, error } = useArticle(id)
  const { data: related, loading: rl }    = useLatestArticles(article?.tags?.[0] || '', 5)
  const isBookmarked = useReaderStore(s => s.isBookmarked(Number(id)))
  const toggle       = useReaderStore(s => s.toggleBookmark)
  const addHistory   = useReaderStore(s => s.addHistory)

  useEffect(() => {
    if (article) { addHistory(article.id); window.scrollTo(0, 0) }
  }, [article?.id])

  if (loading) return (
    <div className="page-enter pt-[60px]">
      <ReadingProgress />
      <div className="wrap py-10 max-w-3xl mx-auto">
        <div className="skeleton h-6 w-32 rounded mb-6" />
        <div className="skeleton h-10 w-full rounded mb-3" />
        <div className="skeleton h-10 w-3/4 rounded mb-8" />
        <div className="skeleton w-full rounded-xl mb-8" style={{ height:'360px' }} />
        {Array(6).fill(0).map((_,i) => (
          <div key={i} className="flex flex-col gap-2 mb-4">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-4/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  )

  if (error || !article) return (
    <div className="pt-[60px] min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <p className="font-mono text-lg" style={{ color:'var(--tx-3)' }}>// 404 — 文章不存在</p>
      <button onClick={() => navigate(-1)} className="tag-em cursor-pointer">← 返回</button>
    </div>
  )

  return (
    <div className="page-enter pt-[60px]">
      <ReadingProgress />

      {/* Article header */}
      <header style={{ background:'var(--bg-2)', borderBottom:'1px solid var(--bd)' }}>
        <div className="wrap py-8 md:py-12 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5 font-mono text-xs" style={{ color:'var(--tx-3)' }}>
            <Link to="/" className="cursor-pointer transition-colors hover:text-[var(--em)]">~/home</Link>
            <span>/</span>
            {article.tags[0] && (
              <>
                <Link to={`/topic/${article.tags[0]}`} className="cursor-pointer transition-colors hover:text-[var(--em)]">
                  {article.tags[0]}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="truncate max-w-[160px]" style={{ color:'var(--tx-2)' }}>{article.slug}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map(t => (
              <Link key={t} to={`/topic/${t}`}
                className="tag-em cursor-pointer" style={{ textDecoration:'none' }}>
                #{t}
              </Link>
            ))}
          </div>

          <h1 className="font-bold leading-tight mb-4" style={{ fontSize:'clamp(22px,4vw,40px)', color:'var(--tx)' }}>
            {article.title}
          </h1>

          {/* Author + meta row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5">
              <img src={article.author.avatar} alt={article.author.name}
                className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium" style={{ color:'var(--tx)' }}>{article.author.name}</p>
                <p className="font-mono text-xs" style={{ color:'var(--tx-3)' }}>@{article.author.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs ml-auto flex-wrap" style={{ color:'var(--tx-3)' }}>
              <span>{fDate(article.publishedAt)}</span>
              <span style={{ color:'var(--em)' }}>{article.readingTime} min read</span>
              <span>♥ {article.reactions}</span>
              <span>💬 {article.comments}</span>
              {/* Bookmark button */}
              <button onClick={() => toggle(article)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--r)] border transition-all cursor-pointer"
                style={{
                  background: isBookmarked ? 'var(--em-lt)' : 'transparent',
                  borderColor: isBookmarked ? 'var(--em)' : 'var(--bd)',
                  color: isBookmarked ? 'var(--em)' : 'var(--tx-2)',
                }}>
                {isBookmarked ? '★ 已收藏' : '☆ 收藏'}
              </button>
              {/* Read on DEV */}
              <a href={article.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-[var(--r)] border transition-all cursor-pointer"
                style={{ borderColor:'var(--bd)', color:'var(--tx-3)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--lv)'; e.currentTarget.style.color='var(--lv)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--bd)'; e.currentTarget.style.color='var(--tx-3)' }}>
                DEV.to ↗
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Cover image */}
      {article.cover && (
        <div className="full-bleed overflow-hidden" style={{ maxHeight:'420px' }}>
          <img src={article.cover} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Article body */}
      <div className="wrap py-10 md:py-14">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-10">

          {/* Body */}
          <article className="lg:col-span-3 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.body_html || `<p>${article.description}</p>` }} />

          {/* Sticky sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-20 flex flex-col gap-5">

              {/* Author card */}
              <div className="card p-4">
                <p className="font-mono text-xs mb-3" style={{ color:'var(--tx-3)' }}>// 作者</p>
                <img src={article.author.avatar} alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover mb-2" />
                <p className="font-semibold text-sm mb-0.5" style={{ color:'var(--tx)' }}>{article.author.name}</p>
                <p className="font-mono text-xs" style={{ color:'var(--tx-3)' }}>@{article.author.username}</p>
                <a href={`https://dev.to/${article.author.username}`} target="_blank" rel="noreferrer"
                  className="tag-em mt-3 inline-block cursor-pointer" style={{ textDecoration:'none' }}>
                  查看主頁 →
                </a>
              </div>

              {/* Stats */}
              <div className="card p-4">
                <p className="font-mono text-xs mb-3" style={{ color:'var(--tx-3)' }}>// 統計</p>
                <div className="flex flex-col gap-2">
                  {[['閱讀時間', `${article.readingTime} 分鐘`],['反應數', article.reactions],['留言數', article.comments]].map(([k,v])=>(
                    <div key={k} className="flex justify-between font-mono text-xs">
                      <span style={{ color:'var(--tx-3)' }}>{k}</span>
                      <span style={{ color:'var(--em)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related articles */}
      <section className="wrap pb-14">
        <div className="glow-line mb-8" />
        <h2 className="font-semibold text-base mb-5" style={{ color:'var(--tx)' }}>
          相關文章
          {article.tags[0] && <span className="tag-em ml-3 text-[10px]">#{article.tags[0]}</span>}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rl
            ? Array(4).fill(0).map((_,i) => <SkeletonCard key={i} />)
            : related?.filter(a => a.id !== article.id).slice(0,4).map((a,i) => (
                <ArticleCard key={a.id} article={a} index={i} />
              ))
          }
        </div>
      </section>
    </div>
  )
}
