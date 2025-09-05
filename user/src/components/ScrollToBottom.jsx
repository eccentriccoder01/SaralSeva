import { useEffect, useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import "./ScrollToBottom.css";

const ScrollToBottom = () => {
  const [visible, setVisible] = useState(false);

  // Show button if not at bottom
  const toggleVisibility = () => {
    if (window.innerHeight + window.scrollY < document.body.scrollHeight - 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button className="scroll-to-bottom" onClick={scrollToBottom}>
        <FaArrowCircleDown />
      </button>
    )
  );
};

export default ScrollToBottom;
