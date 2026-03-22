import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useReaderStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],   // article objects
      history:   [],   // article ids

      toggleBookmark: (article) => {
        const bm = get().bookmarks
        const exists = bm.find(b => b.id === article.id)
        set({ bookmarks: exists ? bm.filter(b => b.id !== article.id) : [article, ...bm] })
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
