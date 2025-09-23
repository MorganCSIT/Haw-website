import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../utils/analytics';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location.pathname]);
}

export function useFormTracking(formType: string) {
  const trackSubmission = () => {
    analytics.trackFormSubmission(formType);
  };

  return { trackSubmission };
}

export function useCartTracking() {
  const trackAdd = (itemName: string) => {
    analytics.trackCartAction('add', itemName);
  };

  const trackRemove = (itemName: string) => {
    analytics.trackCartAction('remove', itemName);
  };

  const trackSubmit = () => {
    analytics.trackCartAction('submit');
  };

  return { trackAdd, trackRemove, trackSubmit };
}