import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
const url = new URL(window.location.href);
const lng = url.searchParams.get("lang");
i18n.use(LanguageDetector).use(initReactI18next).use(Backend).init({
  debug: true,
  returnObjects: true,
  fallbackLng: "en",
  lng: lng,
});
export default i18n;
