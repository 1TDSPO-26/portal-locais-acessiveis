import { Suspense } from "react";
import { Outlet } from "react-router";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import CarregamentoPagina from "./components/CarregamentoPagina/CarregamentoPagina";
 
export default function App() {
  return (
<MainLayout>
<Suspense fallback={<CarregamentoPagina />}>
<Outlet />
</Suspense>
</MainLayout>
  );
}