import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import Home from "./routes/Home";
import Locais from "./routes/Locais";
import Cadastro from "./routes/Cadastro";
import Sobre from "./routes/Sobre";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/locais" element={<Locais />} />
          <Route path="/cadastrar" element={<Cadastro />} />
          <Route path="/sobre" element={<Sobre />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}