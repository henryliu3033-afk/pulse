import { Link } from 'react-router'
import { TOPICS } from '../../constants/topics'

export default function Footer() {
  return (
    <footer style={{ background:'var(--bg-2)', borderTop:'1px solid var(--bd)' }}>
      <div className="wrap py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono font-bold text-xl grad-text">PULSE</span>
              <span className="font-mono text-xs cursor-blink" style={{ color:'var(--em)' }}>_</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color:'var(--tx-3)' }}>
              精選全球科技開發者社群最優質的技術文章，由 DEV.to 社群驅動。
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background:'var(--em)' }} />
              <span className="font-mono text-xs" style={{ color:'var(--em)' }}>LIVE — 即時更新中</span>
            </div>
          </div>

          {/* Topics */}
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color:'var(--tx-3)' }}>主題</p>
            <div className="grid grid-cols-2 gap-2">
              {TOPICS.slice(1).map(({ slug, label }) => (
                <Link key={slug} to={`/topic/${slug}`}
                  className="font-mono text-xs transition-colors cursor-pointer"
                  style={{ color:'var(--tx-2)' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--em)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--tx-2)'}>
                  #{slug}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color:'var(--tx-3)' }}>關於</p>
            <div className="flex flex-col gap-2.5">
              {[['書籤','/bookmarks'],['搜尋','/search'],['DEV.to','https://dev.to']].map(([label,to])=>(
                <a key={label} href={to}
                  className="font-mono text-xs transition-colors cursor-pointer"
                  style={{ color:'var(--tx-2)' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--em)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--tx-2)'}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="glow-line mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs" style={{ color:'var(--tx-3)' }}>
          <span>© {new Date().getFullYear()} PULSE — Powered by DEV.to API</span>
          <span style={{ color:'var(--em)' }}>Built with ⚡ React + Vite</span>
        </div>
      </div>
    </footer>
  )
}
