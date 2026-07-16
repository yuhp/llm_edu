import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ModelBoundariesPage from './pages/ModelBoundariesPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModelBoundariesPage />
  </StrictMode>,
);
