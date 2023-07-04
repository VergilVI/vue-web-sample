// cache.ts

let counter = 0
class LocalCache {
  constructor() {
    // console.log(`LocalCache被调用了${counter++}次`)
  }

  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key) {
    let value = window.localStorage.getItem(key) ?? ''
    if (value) {
      value = JSON.parse(value)
    }
    return value
  }

  deleteCache(key) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()


/* import localCache from '@/utils/cache'
const token = localCache.getCache('token') */