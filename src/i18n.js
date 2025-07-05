import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enGlobal from './locales/en/global.json';
import frGlobal from './locales/fr/global.json';

const resources = {
  en: {
    global: enGlobal
  },
  fr: {
    global: frGlobal
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Default namespace
    defaultNS: 'global',
    ns: ['global'],

    // Key separator
    keySeparator: '.',
    
    // Nested separator
    nsSeparator: ':',
  });

export default i18n;