import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { useReaderStore } from '../../store/reader.store'
import { TOPICS } from '../../constants/topics'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [search,    setSearch]    = useState('')
  const [searching, setSearching] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const bmCount  = useReaderStore(s => s.bookmarks.length)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false); setSearching(false) }, [location.pathname])

  const handleSearch = e => {
    e.preventDefault()
    if (search.trim()) { navigate(`/search?q=${encodeURIComponent(search.trim())}`); setSearch('') }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          background:    scrolled ? 'rgba(3,7,18,.96)' : 'transparent',
          borderBottom:  scrolled ? '1px solid var(--bd)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}>
        <div className="wrap flex items-center justify-between" style={{ height:'60px' }}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono font-bold text-xl tracking-tight grad-text">PULSE</span>
            <span className="font-mono text-[10px] tracking-[0.15em] hidden sm:block cursor-blink"
              style={{ color:'var(--em)' }}>_</span>
          </Link>

          {/* Center topics — desktop */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {TOPICS.slice(0,6).map(({ slug, label }) => (
              <Link key={slug} to={slug ? `/topic/${slug}` : '/'}
                className="font-mono text-xs px-3 py-1.5 rounded-[var(--r)] transition-all cursor-pointer"
                style={{
                  color: location.pathname === (slug ? `/topic/${slug}` : '/') ? 'var(--em)' : 'var(--tx-2)',
                  background: location.pathname === (slug ? `/topic/${slug}` : '/') ? 'var(--em-lt)' : 'transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--tx)'; e.currentTarget.style.background='var(--bg-3)' }}
                onMouseLeave={e => { e.currentTarget.style.color=location.pathname===(slug?`/topic/${slug}`:'/')?'var(--em)':'var(--tx-2)'; e.currentTarget.style.background=location.pathname===(slug?`/topic/${slug}`:'/')?'var(--em-lt)':'transparent' }}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search toggle — desktop */}
            {searching ? (
              <form onSubmit={handleSearch} className="hidden md:flex">
                <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="搜尋文章…"
                  className="search-input text-sm px-4 py-2"
                  style={{ width:'220px' }}
                  onBlur={() => { if (!search) setSearching(false) }} />
              </form>
            ) : (
              <button onClick={() => setSearching(true)}
                className="hidden md:flex w-8 h-8 items-center justify-center rounded-[var(--r)] transition-colors cursor-pointer"
                style={{ color:'var(--tx-2)' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--bg-3)'; e.currentTarget.style.color='var(--tx)' }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--tx-2)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            )}

            {/* Bookmarks */}
            <Link to="/bookmarks"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--r)] text-xs font-mono transition-all cursor-pointer"
              style={{ color:'var(--tx-2)', border:'1px solid var(--bd)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--em)'; e.currentTarget.style.color='var(--em)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--bd)'; e.currentTarget.style.color='var(--tx-2)' }}>
              <span>☆</span>
              <span className="hidden sm:inline">書籤</span>
              {bmCount > 0 && (
                <span className="w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
                  style={{ background:'var(--em)', color:'var(--bg)' }}>
                  {bmCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button className="lg:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px] rounded-[var(--r)] transition-colors cursor-pointer"
              style={{ color:'var(--tx)' }}
              onClick={() => setMenuOpen(v => !v)}>
              {[0,1,2].map(i => (
                <span key={i} className="block h-[1.5px] w-5 transition-all duration-200 origin-center"
                  style={{
                    background: 'var(--tx-2)',
                    opacity: i===1 && menuOpen ? 0 : 1,
                    transform: i===0&&menuOpen ? 'rotate(45deg) translate(4.5px,4.5px)' : i===2&&menuOpen ? 'rotate(-45deg) translate(4.5px,-4.5px)' : 'none',
                  }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            className="fixed top-[60px] left-0 right-0 z-40 lg:hidden overflow-hidden border-b"
            style={{ background:'rgba(3,7,18,.97)', borderColor:'var(--bd)', backdropFilter:'blur(16px)' }}>
            <div className="wrap py-5 flex flex-col gap-1">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="搜尋文章…"
                  className="search-input flex-1 text-sm px-4 py-2.5" />
                <button type="submit" className="px-4 py-2.5 text-sm font-mono font-medium rounded-[var(--r)] cursor-pointer transition-colors"
                  style={{ background:'var(--em)', color:'var(--bg)' }}>
                  搜尋
                </button>
              </form>
              {TOPICS.map(({ slug, label, icon }) => (
                <Link key={slug} to={slug ? `/topic/${slug}` : '/'}
                  className="flex items-center gap-3 px-3 py-3 rounded-[var(--r)] font-mono text-sm transition-colors cursor-pointer"
                  style={{ color:'var(--tx-2)', borderBottom:'1px solid var(--bd)' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--em)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--tx-2)'}>
                  <span>{icon}</span>{label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
