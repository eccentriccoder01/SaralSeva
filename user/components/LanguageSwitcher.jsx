import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <div className="language-switcher" aria-label="Select Language">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="p-2 border rounded-md focus:ring"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
