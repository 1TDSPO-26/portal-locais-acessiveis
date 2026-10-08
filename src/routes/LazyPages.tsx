import { lazy } from 'react';

export const Home = lazy(() => import('./Home/index.tsx'));
export const Locais = lazy(() => import('./Locais/index.tsx'));
export const Cadastro = lazy(() => import('./Cadastro/index.tsx'));
export const Sobre = lazy(() => import('./Sobre/index.tsx'));
export const NotFound = lazy(() => import('./NotFound/index.tsx'));

export const Acessibilidade = lazy(
  () => import('./Acessibilidade/index.tsx')
);

export const LocalDetalhe = lazy(
  () => import('./LocalDetalhe/index.tsx')
);