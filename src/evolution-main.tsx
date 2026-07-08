import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EvolutionPage from './pages/EvolutionPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EvolutionPage />
  </StrictMode>,
);
