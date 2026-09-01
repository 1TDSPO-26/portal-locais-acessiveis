import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { Outlet } from "react-router";

export default function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
