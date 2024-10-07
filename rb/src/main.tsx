import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CounterProvider } from './hooks/counter-hook.tsx';
import { BrowserRouter } from 'react-router-dom';
// import Hello from './components/Hello.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CounterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CounterProvider>
  </StrictMode>
);
