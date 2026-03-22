import { useState, useEffect, useRef } from 'react'
import { fetchTop, fetchLatest, fetchArticle, searchArticles } from '../lib/devto'

const cache = new Map()

function useFetch(key, fetcher) {
  const [data,    setData]    = useState(cache.get(key) || null)
  const [loading, setLoading] = useState(!cache.has(key))
  const [error,   setError]   = useState(null)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    if (cache.has(key)) { setData(cache.get(key)); setLoading(false); return }
    setLoading(true)
    setError(null)
    fetcher()
      .then(d => { if (!mounted.current) return; cache.set(key, d); setData(d); setLoading(false) })
      .catch(e => { if (!mounted.current) return; setError(e.message); setLoading(false) })
    return () => { mounted.current = false }
  }, [key])

  return { data, loading, error }
}

export function useTopArticles(n = 12) {
  return useFetch(`top-${n}`, () => fetchTop(n))
}

export function useLatestArticles(tag = '', n = 20) {
  return useFetch(`latest-${tag}-${n}`, () => fetchLatest(n, tag))
}

export function useArticle(id) {
  return useFetch(`article-${id}`, () => fetchArticle(id))
}

export function useSearch(query) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!query || query.length < 2) { setData(null); return }
    setLoading(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      searchArticles(query)
        .then(d => { setData(d); setLoading(false) })
        .catch(e => { setError(e.message); setLoading(false) })
    }, 400)
    return () => clearTimeout(timerRef.current)
  }, [query])

  return { data, loading, error }
}
