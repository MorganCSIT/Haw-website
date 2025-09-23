// Analytics utility for tracking user interactions
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];

  track(event: AnalyticsEvent): void {
    this.events.push({
      ...event,
      timestamp: Date.now()
    } as any);

    // In a real implementation, you would send this to your analytics service
    console.log('Analytics Event:', event);
  }

  trackPageView(page: string): void {
    this.track({
      action: 'page_view',
      category: 'navigation',
      label: page
    });
  }

  trackFormSubmission(formType: string): void {
    this.track({
      action: 'form_submit',
      category: 'engagement',
      label: formType
    });
  }

  trackCartAction(action: 'add' | 'remove' | 'submit', itemName?: string): void {
    this.track({
      action: `cart_${action}`,
      category: 'ecommerce',
      label: itemName
    });
  }

  trackUserAction(action: string, category: string = 'user', label?: string): void {
    this.track({
      action,
      category,
      label
    });
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clearEvents(): void {
    this.events = [];
  }
}

export const analytics = new Analytics();