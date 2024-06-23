import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "../public/locales/en/translation.json";
import kn from "../public/locales/kn/translation.json";
import hi from "../public/locales/hi/translation.json";
import ml from "../public/locales/ml/translation.json";
import ta from "../public/locales/ta/translation.json";
import te from "../public/locales/te/translation.json";
const url = new URL(window.location.href);
const lng = url.searchParams.get("lang");
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    returnObjects: true,
    fallbackLng: "en",
    lng: lng || "en",
    resources: {
      en: {
        translation: en,
      },
      kn: {
        translation: kn,
      },
      te: {
        translation: te,
      },
      hi: {
        translation: hi,
      },
      ml: {
        translation: ml,
      },
      ta: {
        translation: ta,
      },
    },
  });
export default i18n;
