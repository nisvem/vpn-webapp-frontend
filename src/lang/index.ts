import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';

i18next.use(HttpBackend).init({
  lng: 'ru',
  fallbackLng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    loadPath: '/lang/{{lng}}/{{ns}}.json', // Путь к файлам переводов
  },
  interpolation: {
    escapeValue: false, // Не экранировать переменные
  },
});

export default i18next;
