import { useParams, Link } from 'react-router'
import { motion } from 'motion/react'
import { useLatestArticles } from '../hooks/useArticles'
import { ArticleCard, HeroCard } from '../components/article/ArticleCard'
import { SkeletonCard, SkeletonHero } from '../components/ui/SkeletonCard'
import { TOPICS } from '../constants/topics'

export default function TopicPage() {
  const { slug } = useParams()
  const topic    = TOPICS.find(t => t.slug === slug) || { slug, label: `#${slug}`, icon: '#' }
  const { data, loading, error } = useLatestArticles(slug, 24)

  return (
    <div className="page-enter pt-[60px]">
      {/* Header */}
      <div style={{ background:'var(--bg-2)', borderBottom:'1px solid var(--bd)' }}>
        <div className="wrap py-10 md:py-14">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-2" style={{ color:'var(--em)' }}>
                TOPIC
              </span>
              <h1 className="font-bold mb-2 grad-text" style={{ fontSize:'clamp(28px,5vw,52px)' }}>
                #{slug}
              </h1>
              <p className="font-mono text-sm" style={{ color:'var(--tx-3)' }}>
                {data ? `${data.length} 篇文章` : '載入中…'}
              </p>
            </div>
            {/* Topic switcher */}
            <div className="hidden md:flex flex-wrap gap-2 max-w-xs">
              {TOPICS.slice(1, 7).map(t => (
                <Link key={t.slug} to={`/topic/${t.slug}`}
                  className={`cursor-pointer ${t.slug === slug ? 'tag-em' : 'tag-ghost'}`}>
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="wrap py-8 md:py-12">
        {error && (
          <div className="text-center py-12">
            <p className="font-mono text-sm" style={{ color:'var(--tx-3)' }}>// 無法載入文章，請稍後再試</p>
          </div>
        )}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2"><SkeletonHero /></div>
            {Array(5).fill(0).map((_,i) => <SkeletonCard key={i} />)}
          </div>
        ) : data && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data[0] && <div className="sm:col-span-2"><HeroCard article={data[0]} /></div>}
            {data.slice(1).map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
          </motion.div>
        )}
      </div>
    </div>
  )
}
