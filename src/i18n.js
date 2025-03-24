import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/en.json";
import translationAR from "./locales/ar.json";

// Define translations
const resources = {
    en: { translation: translationEN },
    ar: { translation: translationAR }
};

i18n
    .use(initReactI18next) // Enables hooks like useTranslation
    .use(LanguageDetector)  // Detects browser language
    .init({
        resources,
        lng: "en", // Default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
