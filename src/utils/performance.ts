// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(label: string): void {
    this.metrics.set(label, performance.now());
  }

  endTimer(label: string): number {
    const startTime = this.metrics.get(label);
    if (!startTime) {
      console.warn(`Timer "${label}" was not started`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.metrics.delete(label);
    
    console.log(`Performance: ${label} took ${duration.toFixed(2)}ms`);
    return duration;
  }

  measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTimer(label);
    return fn().finally(() => {
      this.endTimer(label);
    });
  }

  measureSync<T>(label: string, fn: () => T): T {
    this.startTimer(label);
    try {
      return fn();
    } finally {
      this.endTimer(label);
    }
  }
}

export const performance = PerformanceMonitor.getInstance();

// Image optimization utilities
export function getOptimizedImageUrl(url: string, width?: number, height?: number, quality: number = 80): string {
  // For Unsplash images, add optimization parameters
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());
    params.set('auto', 'format');
    
    return `${url}&${params.toString()}`;
  }

  return url;
}

// Lazy loading utility
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
}