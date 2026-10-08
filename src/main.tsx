import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './global.css';
import App from './App.tsx';

import {
  Home,
  Locais,
  Cadastro,
  Sobre,
  NotFound,
  Acessibilidade,
  LocalDetalhe,
} from './routes/LazyPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/locais', element: <Locais /> },
      { path: '/locais/:id', element: <LocalDetalhe /> },
      { path: '/cadastrar', element: <Cadastro /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '/acessibilidade', element: <Acessibilidade /> },
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense
      fallback={<p role="status">Carregando página...</p>}
    >
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);