import 'antd/dist/reset.css';
import i18next from 'i18next';
import * as ReactDOM from 'react-dom/client';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { App } from './App';
import { EmptyWithI18n } from './components/EmptyWithI18n';
import './css/tailwind.css';
import { LanguageMappingToAntLocales } from './packages/_Common/Language/constants/LanguageMappingToAntLocales';
import { Language } from './packages/_Common/Language/models/Language';
import { ThemeProvider } from '~/shared/ReactJS';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('Service worker registration successful:', registration);
      })
      .catch(error => {
        console.log('Service worker registration failed:', error);
      });
  });
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const AppWithI18n = () => {
  const { i18n } = useTranslation();
  return (
    <ThemeProvider
      isSSR={false}
      config={{ fontFamily: 'Lexend Deca', controlHeight: 38, borderRadius: 10 }}
      locale={LanguageMappingToAntLocales[i18n.language as Language]}
      renderEmpty={() => {
        return <EmptyWithI18n />;
      }}
    >
      <App />
    </ThemeProvider>
  );
};

root.render(
  <I18nextProvider i18n={i18next}>
    <AppWithI18n />
  </I18nextProvider>,
);
