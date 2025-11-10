import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';

const resources = {
    en: { translation: en },
    hi: { translation: hi },
};

// Get saved language or default to English
const savedLanguage = localStorage.getItem('language') || 'en';

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already protects from XSS
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18next;
