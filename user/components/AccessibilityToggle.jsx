import React, { useEffect, useState } from "react";

const AccessibilityToggle = () => {
  const [enabled, setEnabled] = useState(localStorage.getItem("contrast") === "true");

  useEffect(() => {
    document.body.classList.toggle("high-contrast", enabled);
    localStorage.setItem("contrast", enabled);
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      aria-pressed={enabled}
      className="ml-3 p-2 rounded-md border focus:ring-2 focus:ring-blue-400"
    >
      {enabled ? "Disable High Contrast" : "Enable High Contrast"}
    </button>
  );
};

export default AccessibilityToggle;
