import { Link } from 'react-router'
import { motion } from 'motion/react'
import { fDate } from '../../lib/devto'
import { useReaderStore } from '../../store/reader.store'

function Tag({ tag }) {
  const colors = {
    javascript:'var(--em)', typescript:'var(--em)', react:'var(--lv)',
    python:'var(--em)', ai:'var(--lv)', webdev:'var(--em)',
    devops:'#22D3EE', career:'#F59E0B', opensource:'var(--em)',
  }
  const c = colors[tag?.toLowerCase()] || 'var(--tx-3)'
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium font-mono border"
      style={{ color: c, borderColor: `${c}30`, background: `${c}12` }}>
      #{tag}
    </span>
  )
}

/* ── Large featured card (hero) ── */
export function HeroCard({ article, index = 0 }) {
  const isBookmarked = useReaderStore(s => s.isBookmarked(article.id))
  const toggle = useReaderStore(s => s.toggleBookmark)

  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:.4, delay: index * .08 }}>
      <Link to={`/article/${article.id}`} className="group block card overflow-hidden">
        <div className="relative overflow-hidden" style={{ aspectRatio:'16/9' }}>
          <img src={article.cover} alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
          <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(3,7,18,.9) 0%, transparent 60%)' }} />
          {/* Tags overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {article.tags.slice(0,2).map(t => <Tag key={t} tag={t} />)}
          </div>
          {/* Bookmark */}
          <button
            onClick={e => { e.preventDefault(); toggle(article) }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all"
            style={{ background: isBookmarked ? 'var(--em)' : 'rgba(3,7,18,.6)', color: isBookmarked ? 'var(--bg)' : 'var(--tx-2)' }}>
            {isBookmarked ? '★' : '☆'}
          </button>
          {/* Bottom text */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="font-semibold text-white leading-snug line-clamp-2"
              style={{ fontSize:'clamp(16px,2.5vw,22px)' }}>
              {article.title}
            </h2>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm leading-relaxed line-clamp-2 mb-3" style={{ color:'var(--tx-2)' }}>
            {article.description}
          </p>
          <div className="flex items-center gap-3">
            <img src={article.author.avatar} alt={article.author.name}
              className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
            <span className="text-xs flex-1 truncate" style={{ color:'var(--tx-2)' }}>{article.author.name}</span>
            <span className="font-mono text-xs" style={{ color:'var(--tx-3)' }}>{article.readingTime}m read</span>
            <span className="font-mono text-xs flex-shrink-0" style={{ color:'var(--tx-3)' }}>
              ♥ {article.reactions}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── Standard card ── */
export function ArticleCard({ article, index = 0 }) {
  const isBookmarked = useReaderStore(s => s.isBookmarked(article.id))
  const toggle = useReaderStore(s => s.toggleBookmark)

  return (
    <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'0px' }} transition={{ duration:.35, delay: index * .06 }}>
      <Link to={`/article/${article.id}`} className="group block card overflow-hidden">
        <div className="relative overflow-hidden" style={{ aspectRatio:'16/9' }}>
          <img src={article.cover} alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
          <button
            onClick={e => { e.preventDefault(); toggle(article) }}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full text-sm cursor-pointer transition-all"
            style={{ background: isBookmarked ? 'var(--em)' : 'rgba(3,7,18,.7)', color: isBookmarked ? 'var(--bg)' : 'var(--tx-2)' }}>
            {isBookmarked ? '★' : '☆'}
          </button>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {article.tags.slice(0,2).map(t => <Tag key={t} tag={t} />)}
          </div>
          <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[var(--em)] transition-colors"
            style={{ color:'var(--tx)' }}>
            {article.title}
          </h3>
          <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color:'var(--tx-3)' }}>
            {article.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <img src={article.author.avatar} alt="" className="w-6 h-6 rounded-full flex-shrink-0 object-cover" />
              <span className="text-xs truncate" style={{ color:'var(--tx-2)' }}>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-mono text-xs" style={{ color:'var(--tx-3)' }}>{article.readingTime}m</span>
              <span className="font-mono text-xs" style={{ color:'var(--tx-3)' }}>♥{article.reactions}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── Horizontal list row ── */
export function ArticleRow({ article, index = 0 }) {
  return (
    <motion.div initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true, margin:'0px' }} transition={{ delay: index * .05 }}>
      <Link to={`/article/${article.id}`}
        className="group flex gap-3 md:gap-4 py-4 border-b cursor-pointer transition-colors hover:bg-[var(--bg-2)] px-2 rounded-[var(--r)]"
        style={{ borderColor:'var(--bd)' }}>
        <img src={article.cover} alt={article.title}
          className="flex-shrink-0 object-cover rounded-[var(--r)] transition-transform duration-300 group-hover:scale-105"
          style={{ width:'clamp(80px,15vw,104px)', height:'clamp(60px,11vw,78px)' }}
          loading="lazy" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1 mb-1.5">
            {article.tags.slice(0,1).map(t => <Tag key={t} tag={t} />)}
          </div>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 mb-1 group-hover:text-[var(--em)] transition-colors"
            style={{ color:'var(--tx)' }}>
            {article.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px]" style={{ color:'var(--tx-3)' }}>{article.author.name}</span>
            <span style={{ color:'var(--bd-2)' }}>·</span>
            <span className="font-mono text-[10px]" style={{ color:'var(--tx-3)' }}>{fDate(article.publishedAt)}</span>
            <span style={{ color:'var(--bd-2)' }}>·</span>
            <span className="font-mono text-[10px]" style={{ color:'var(--tx-3)' }}>{article.readingTime}m read</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
