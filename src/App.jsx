import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import Navbar        from './components/layout/Navbar'
import Footer        from './components/layout/Footer'
import Home          from './pages/Home'
import ArticlePage   from './pages/ArticlePage'
import TopicPage     from './pages/TopicPage'
import SearchPage    from './pages/SearchPage'
import BookmarksPage from './pages/BookmarksPage'

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"              element={<Home />} />
        <Route path="/article/:id"   element={<ArticlePage />} />
        <Route path="/topic/:slug"   element={<TopicPage />} />
        <Route path="/search"        element={<SearchPage />} />
        <Route path="/bookmarks"     element={<BookmarksPage />} />
        <Route path="*"              element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
