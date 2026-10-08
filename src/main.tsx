import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './global.css';
import App from './App.tsx';

// Carrega cada página somente quando ela precisar aparecer
const Home = lazy(() => import('./routes/Home/index.tsx'));
const Locais = lazy(() => import('./routes/Locais/index.tsx'));
const Cadastro = lazy(() => import('./routes/Cadastro/index.tsx'));
const Sobre = lazy(() => import('./routes/Sobre/index.tsx'));
const NotFound = lazy(() => import('./routes/NotFound/index.tsx'));
const Acessibilidade = lazy(
  () => import('./routes/Acessibilidade/index.tsx')
);
const LocalDetalhe = lazy(
  () => import('./routes/LocalDetalhe/index.tsx')
);

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