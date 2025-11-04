import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop.jsx
// - Automatically scrolls to top on route changes (react-router)
// - Renders a floating "Scroll to top" button that appears after the user scrolls down

export default function ScrollToTop() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  // Scroll to top when the route/pathname changes
  useEffect(() => {
    // Use instant for small jumps, smooth for nicer UX
    // If you prefer no-smooth change, replace behavior: 'smooth' with behavior: 'auto'
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // also hide the button on navigation
    setVisible(false);
  }, [location.pathname]);

  // Show/hide button based on scroll position
  useEffect(() => {
    function onScroll() {
      const shouldShow = window.scrollY > 300; // show after 300px scrolled
      setVisible(shouldShow);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  // Inline styles (feel free to replace with your CSS/Tailwind classes)
  const btnStyle = {
    position: 'fixed',
    right: '1rem',
    bottom: '5.25rem',
    width: '44px',
    height: '44px',
    borderRadius: '999px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
    border: 'none',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    zIndex: 9999,
    background: 'white',
  };

  return (
    <>
      {/* Invisible component for route-change auto-scroll handled in effect above */}

      {/* Scroll-to-top button */}
      {visible && (
        <button
          aria-label="Scroll to top"
          title="Scroll to top"
          onClick={handleClick}
          style={btnStyle}
        >
          {/* simple chevron icon (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </>
  );
}
