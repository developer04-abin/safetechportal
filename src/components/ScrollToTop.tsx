import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout to allow lazy-loaded components to render if navigating from another page
      const timer = setTimeout(() => {
        const elem = document.querySelector(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash]);

  return null;
}
