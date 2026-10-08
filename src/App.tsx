import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { MainLayout } from './layouts/MainLayout/MainLayout';

export default function App() {
  return (
    <MainLayout>
      <Suspense
        fallback={<p role="status">Carregando página...</p>}
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
}