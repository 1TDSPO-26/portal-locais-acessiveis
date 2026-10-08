import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import type { ReactNode } from "react";

// Define a interface para as Props do Layout
interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
};
