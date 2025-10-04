import { useEffect, useState } from "react";
import "./ScrollToTop.css"; // This file will contain the new professional styles

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling down 100px
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button
        className="scroll-btn-professional scroll-to-top" // New class name
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        {/* SVG with two upward-pointing chevrons */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 15L12 9L6 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 19L12 13L6 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    )
  );
};

export default ScrollToTop;