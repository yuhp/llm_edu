import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ClientToolsPage from './pages/ClientToolsPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientToolsPage />
  </StrictMode>,
);
