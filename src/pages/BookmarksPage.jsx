import { Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useReaderStore } from '../store/reader.store'
import { ArticleCard } from '../components/article/ArticleCard'

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useReaderStore()

  return (
    <div className="page-enter pt-[60px]">
      <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--bd)' }}>
        <div className="wrap py-10 md:py-14">
          <p className="font-mono text-xs mb-2" style={{ color: 'var(--em)' }}>// 已收藏</p>
          <h1 className="font-bold mb-1" style={{ fontSize: 'clamp(24px,4vw,40px)', color: 'var(--tx)' }}>
            我的書籤
          </h1>
          <p className="font-mono text-sm" style={{ color: 'var(--tx-3)' }}>
            {bookmarks.length} 篇文章
          </p>
        </div>
      </div>

      <div className="wrap py-8 md:py-12">
        {bookmarks.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-mono text-5xl mb-5" style={{ color: 'var(--bg-4)' }}>{'[ ]'}</p>
            <p className="font-mono text-xl mb-2" style={{ color: 'var(--tx-3)' }}>
              // 還沒有收藏任何文章
            </p>
            <p className="font-mono text-base mb-8" style={{ color: 'var(--tx-3)' }}>
              點擊文章卡片上的 ☆ 即可收藏
            </p>
            <Link to="/" className="cursor-pointer inline-flex items-center"
              style={{
                textDecoration: 'none',
                fontSize: '1.5rem',
                fontFamily: 'var(--mono)',
                fontWeight: '600',
                padding: '0.75rem 2rem',
                borderRadius: 'var(--r-lg)',
                background: 'var(--em)',
                color: 'var(--bg)',
                boxShadow: '0 0 24px var(--em-glow)',
              }}>
              去探索文章 →
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-xs" style={{ color: 'var(--tx-3)' }}>
                已儲存 {bookmarks.length} 篇
              </p>
              <button
                onClick={() => bookmarks.forEach(b => toggleBookmark(b))}
                className="font-mono text-xs px-3 py-1.5 rounded-[var(--r)] border transition-all cursor-pointer"
                style={{ color: 'var(--tx-3)', borderColor: 'var(--bd)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#EF4444'; e.currentTarget.style.color = '#EF4444' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bd)'; e.currentTarget.style.color = 'var(--tx-3)' }}>
                清空全部
              </button>
            </div>

            <AnimatePresence>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {bookmarks.map((article, i) => (
                  <motion.div key={article.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: .15 } }}
                    transition={{ delay: i * .05 }}>
                    <ArticleCard article={article} index={i} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}
