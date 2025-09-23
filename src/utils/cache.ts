import { CACHE_DURATION } from './constants';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  duration: number;
}

class Cache {
  private storage = new Map<string, CacheItem<any>>();

  set<T>(key: string, data: T, duration: number = CACHE_DURATION.medium): void {
    this.storage.set(key, {
      data,
      timestamp: Date.now(),
      duration
    });
  }

  get<T>(key: string): T | null {
    const item = this.storage.get(key);
    
    if (!item) return null;
    
    const isExpired = Date.now() - item.timestamp > item.duration;
    
    if (isExpired) {
      this.storage.delete(key);
      return null;
    }
    
    return item.data;
  }

  delete(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.storage.entries()) {
      if (now - item.timestamp > item.duration) {
        this.storage.delete(key);
      }
    }
  }
}

export const cache = new Cache();

// Auto cleanup every 10 minutes
setInterval(() => cache.cleanup(), 10 * 60 * 1000);