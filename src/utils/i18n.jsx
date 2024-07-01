import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationAr from '../locales/ar/translation.json';
import translationFr from '../locales/fr/translation.json';
import translationEn from '../locales/en/translation.json';
import translationHi from '../locales/hi/translation.json';

const searchParams = new URLSearchParams(window.location.search); 
const locale = searchParams.has('locale') ? searchParams.get('locale') : navigator.language.split("-")[0]; 

const resources = {
    en: {
      translation: translationEn,
    },
    fr: {
      translation: translationFr,
    },
    ar: {
      translation: translationAr,
      options: {
        interpolation: {
          escapeValue: false,
        },
        fallbackLng: 'en',
        lng: locale,
        rtl: false,
      },
    },
    hi: { 
      translation: translationHi,
    }
};

i18n.use(initReactI18next).init({
  resources,
  lng: locale,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
