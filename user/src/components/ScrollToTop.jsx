import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "./ScrollToTop.css"; 

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling 100px
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
      <button className="scroll-to-top" onClick={scrollToTop}>
        <FaArrowCircleUp  />
      </button>
    )
  );
};

export default ScrollToTop;
