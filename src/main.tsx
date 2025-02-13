import 'antd/dist/reset.css';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from '~/shared/ReactJS';
import './css/tailwind.css';

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

root.render(
  <ThemeProvider isSSR={false} config={{ fontFamily: 'Lexend Deca', controlHeight: 38, borderRadius: 10 }}>
    <App />
  </ThemeProvider>,
);
