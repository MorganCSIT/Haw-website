import { useState, useEffect } from 'react';
import { getBreakpoint, isMobile, isTablet, isDesktop, BREAKPOINTS } from '../utils/responsive';

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export function useResponsive() {
  const [responsive, setResponsive] = useState({
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop()
  });

  useEffect(() => {
    const handleResize = () => {
      setResponsive({
        isMobile: isMobile(),
        isTablet: isTablet(),
        isDesktop: isDesktop()
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return responsive;
}