import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getBookmarks, addBookmark, removeBookmark } from '../lib/api'

export const useReaderStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],
      history:   [],

      // 登入後從後端拉書籤
      fetchBookmarks: async (token) => {
        try {
          const data = await getBookmarks(token)
          // 把後端格式轉回前端格式
          const bms = data.map(b => ({
            id:          b.article_id,
            title:       b.title,
            description: b.description,
            cover:       b.cover,
            url:         b.url,
            readingTime: b.reading_time,
            author:      { name: b.author_name },
          }))
          set({ bookmarks: bms })
        } catch (e) {
          console.error('拉書籤失敗', e)
        }
      },

      toggleBookmark: async (article, token) => {
        const bm     = get().bookmarks
        const exists = bm.find(b => b.id === article.id)

        if (token) {
          // 已登入 → 走後端
          try {
            if (exists) {
              await removeBookmark(token, article.id)
              set({ bookmarks: bm.filter(b => b.id !== article.id) })
            } else {
              await addBookmark(token, article)
              set({ bookmarks: [article, ...bm] })
            }
          } catch (e) {
            console.error('書籤操作失敗', e)
          }
        } else {
          // 未登入 → 存 localStorage
          set({ bookmarks: exists ? bm.filter(b => b.id !== article.id) : [article, ...bm] })
        }
      },

      isBookmarked: (id) => get().bookmarks.some(b => b.id === id),

      addHistory: (id) => {
        const h = get().history.filter(x => x !== id)
        set({ history: [id, ...h].slice(0, 50) })
      },
    }),
    { name: 'pulse-reader' }
  )
)
