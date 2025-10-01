import { useEffect, useState } from "react";
import "./ScrollToBottom.css";

const ScrollToBottom = () => {
  const [visible, setVisible] = useState(true); // Always visible

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // Optional: toggle visibility based on scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.innerHeight + window.scrollY < document.body.scrollHeight - 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button
        className="scroll-btn-professional" // New class name for the new style
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
      >
        {/* SVG with three chevrons for the cascade animation */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 5L12 11L18 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    )
  );
};

export default ScrollToBottom;
