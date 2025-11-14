// user/App.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "./i18n"; // initializes multilingual support
import LanguageSwitcher from "./components/LanguageSwitcher";
import AccessibilityToggle from "./components/AccessibilityToggle";
import "./App.css"; // optional styling (see below)

function App() {
  const { t } = useTranslation(); // translation hook

  return (
    <div
      className="App min-h-screen bg-gray-50 text-gray-900 transition-all duration-300"
      role="application"
    >
      {/* ✅ HEADER */}
      <header
        className="flex justify-between items-center p-4 border-b bg-white shadow-sm"
        aria-label="Main Header"
      >
        <h1
          className="text-2xl font-bold text-blue-700"
          aria-label={t("app.title")}
        >
          {t("app.title")}
        </h1>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <AccessibilityToggle />
        </div>
      </header>

      {/* ✅ MAIN CONTENT */}
      <main
        className="flex flex-col justify-center items-center text-center py-10 px-4"
        aria-live="polite"
      >
        <h2 className="text-3xl font-semibold mb-4 text-blue-800">
          {t("app.welcome")}
        </h2>

        <p className="max-w-lg text-lg mb-8 text-gray-700 leading-relaxed">
          {t("home.tagline")}
        </p>

        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          aria-label={t("home.getStarted")}
        >
          {t("home.getStarted")}
        </button>
      </main>

      {/* ✅ FOOTER */}
      <footer
        className="py-4 border-t text-center text-sm bg-gray-100 text-gray-600"
        aria-label="Footer"
      >
        <p>
          © {new Date().getFullYear()} SaralSeva —{" "}
          {t("app.language")}:{" "}
          {t("app.language") === "Language" ? "English" : "हिन्दी"}
        </p>
      </footer>
    </div>
  );
}

export default App;
