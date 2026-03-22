import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { useTopArticles, useLatestArticles } from '../hooks/useArticles'
import { HeroCard, ArticleCard, ArticleRow } from '../components/article/ArticleCard'
import { SkeletonCard, SkeletonHero, SkeletonRow } from '../components/ui/SkeletonCard'
import { TOPICS } from '../constants/topics'

export default function Home() {
  const { data: top,    loading: tl } = useTopArticles(12)
  const { data: latest, loading: ll } = useLatestArticles('', 20)

  const hero    = top?.[0]
  const grid4   = top?.slice(1, 5)
  const sidebar = top?.slice(5, 10)

  return (
    <div className="page-enter pt-[60px]">

      {/* ── Hero masthead ── */}
      <section style={{ background:'var(--bg-2)', borderBottom:'1px solid var(--bd)' }}>
        <div className="wrap py-8 md:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ background:'var(--em)' }} />
                <span className="font-mono text-xs" style={{ color:'var(--em)' }}>LIVE — 本週熱門</span>
              </div>
              <h1 className="font-semibold" style={{ fontSize:'clamp(22px,3vw,32px)', color:'var(--tx)' }}>
                科技脈動 <span className="grad-text">PULSE</span>
              </h1>
            </div>
            {/* Topic pills */}
            <div className="flex flex-wrap gap-2">
              {TOPICS.slice(1, 6).map(({ slug, label }) => (
                <Link key={slug} to={`/topic/${slug}`} className="tag-ghost cursor-pointer">{label}</Link>
              ))}
            </div>
          </div>

          {/* Main grid: 1 hero + 4 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Hero — spans 1 col on md, 2 cols on lg */}
            <div className="md:col-span-2 lg:col-span-2">
              {tl ? <SkeletonHero /> : hero && <HeroCard article={hero} />}
            </div>

            {/* Side stack */}
            <div className="flex flex-col gap-4">
              {tl
                ? Array(3).fill(0).map((_,i) => <SkeletonCard key={i} />)
                : grid4?.slice(0,3).map((a,i) => <ArticleCard key={a.id} article={a} index={i} />)
              }
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider with glow ── */}
      <div className="glow-line" />

      {/* ── Main content: grid + sidebar ── */}
      <section className="wrap py-10 md:py-14">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-10">

          {/* Left: latest grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-base" style={{ color:'var(--tx)' }}>
                最新文章
                <span className="font-mono text-xs ml-2" style={{ color:'var(--tx-3)' }}>
                  {latest ? `(${latest.length})` : ''}
                </span>
              </h2>
              <Link to="/topic/" className="font-mono text-xs cursor-pointer transition-colors"
                style={{ color:'var(--tx-3)' }}
                onMouseEnter={e => e.currentTarget.style.color='var(--em)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--tx-3)'}>
                全部 →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ll
                ? Array(6).fill(0).map((_,i) => <SkeletonCard key={i} />)
                : latest?.slice(0,10).map((a,i) => <ArticleCard key={a.id} article={a} index={i} />)
              }
            </div>
          </div>

          {/* Right sidebar: trending rows */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">

              {/* Trending */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs" style={{ color:'var(--lv)' }}>▲ 熱門本週</span>
                </div>
                {tl
                  ? Array(5).fill(0).map((_,i) => <SkeletonRow key={i} />)
                  : sidebar?.map((a,i) => <ArticleRow key={a.id} article={a} index={i} />)
                }
              </div>

              {/* Topic cloud */}
              <div className="card p-5">
                <p className="font-mono text-xs mb-4" style={{ color:'var(--tx-3)' }}>// 探索主題</p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.slice(1).map(({ slug }) => (
                    <Link key={slug} to={`/topic/${slug}`} className="tag-ghost cursor-pointer">#{slug}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── More articles ── */}
      {latest && latest.length > 10 && (
        <section className="wrap pb-14">
          <div className="glow-line mb-10" />
          <h2 className="font-semibold text-base mb-6" style={{ color:'var(--tx)' }}>更多文章</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {latest.slice(10, 18).map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
          </div>
        </section>
      )}
    </div>
  )
}
