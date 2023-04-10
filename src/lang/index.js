import antdEnUS from "antd/es/locale/en_US";
import en from "./locales/en_US.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { THEME_CONFIG } from "configs/AppConfig";

export const resources = {
  en: {
    translation: en,
    antd: antdEnUS,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: THEME_CONFIG.locale,
  lng: THEME_CONFIG.locale,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
