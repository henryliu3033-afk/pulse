const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function req(path, options = {}) {
  const { headers: extraHeaders, ...rest } = options
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
    ...rest,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.detail || '發生錯誤')
  return data
}

export async function register({ name, email, password }) {
  return req('/users/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export async function login({ email, password }) {
  return req('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

function authHeader(token) {
  return { Authorization: `Bearer ${token}` }
}

export async function getBookmarks(token) {
  return req('/bookmarks', { headers: authHeader(token) })
}

export async function addBookmark(token, article) {
  return req('/bookmarks', {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify({
      article_id:   article.id,
      title:        article.title,
      description:  article.description || '',
      cover:        article.cover || '',
      url:          article.url || '',
      author_name:  article.author?.name || '',
      reading_time: article.readingTime || 0,
    }),
  })
}

export async function removeBookmark(token, articleId) {
  return req(`/bookmarks/${articleId}`, {
    method: 'DELETE',
    headers: authHeader(token),
  })
}
