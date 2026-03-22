const BASE = 'https://dev.to/api'

/**
 * Normalise a raw DEV.to article into our app shape.
 */
function normalise(raw) {
  return {
    id:           raw.id,
    slug:         raw.slug,
    title:        raw.title,
    description:  raw.description || '',
    body_html:    raw.body_html || '',
    cover:        raw.cover_image || raw.social_image || `https://picsum.photos/seed/${raw.id}/800/420`,
    tags:         raw.tag_list || [],
    readingTime:  raw.reading_time_minutes || 3,
    reactions:    raw.public_reactions_count || 0,
    comments:     raw.comments_count || 0,
    publishedAt:  raw.published_at,
    url:          raw.url,
    author: {
      name:   raw.user?.name    || 'Unknown',
      avatar: raw.user?.profile_image_90 || raw.user?.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(raw.user?.name||'U')}&background=10B981&color=fff`,
      username: raw.user?.username || '',
    },
  }
}

async function req(path, params = {}) {
  const qs = new URLSearchParams(params).toString()
  const url = `${BASE}${path}${qs ? '?' + qs : ''}`
  const res  = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`DEV.to API ${res.status}`)
  return res.json()
}

// ── Public API ─────────────────────────────────────────────

/** Top articles of the week (for hero / featured) */
export async function fetchTop(perPage = 12) {
  const data = await req('/articles', { per_page: perPage, top: 7 })
  return data.map(normalise)
}

/** Latest articles, optionally filtered by tag */
export async function fetchLatest(perPage = 20, tag = '') {
  const params = { per_page: perPage }
  if (tag) params.tag = tag
  const data = await req('/articles', params)
  return data.map(normalise)
}

/** Single article by id */
export async function fetchArticle(id) {
  const data = await req(`/articles/${id}`)
  return normalise(data)
}

/** Search – DEV.to doesn't have public search; we filter client-side */
export async function searchArticles(query, perPage = 30) {
  const data = await req('/articles', { per_page: perPage, top: 30 })
  const q = query.toLowerCase()
  return data
    .filter(a => a.title.toLowerCase().includes(q) || (a.tag_list||[]).some(t => t.includes(q)))
    .map(normalise)
}

// Tag colour mapping
export function tagColor(tag) {
  const map = {
    javascript: 'var(--em)', typescript: 'var(--em)', react: 'var(--lv)',
    python: 'var(--em)', rust: '#F97316', go: '#22D3EE',
    css: 'var(--lv)', html: '#F97316', node: 'var(--em)',
    ai: 'var(--lv)', machinelearning: 'var(--lv)', webdev: 'var(--em)',
    career: '#F59E0B', devops: '#22D3EE', docker: '#22D3EE',
    opensource: 'var(--em)', tutorial: '#F59E0B', beginners: '#F59E0B',
  }
  return map[tag.toLowerCase()] || 'var(--tx-3)'
}

export function fDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('zh-TW', { year: 'numeric', month: 'short', day: 'numeric' })
}
