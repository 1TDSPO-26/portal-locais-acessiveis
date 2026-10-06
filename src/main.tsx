import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router';

// Import das rotas
import Home from './routes/Home/index.tsx';
import Locais from './routes/Locais/index.tsx';
import Cadastro from './routes/Cadastro/index.tsx';
import Sobre from './routes/Sobre/index.tsx';
import NotFound from './routes/NotFound/index.tsx';
import Acessibilidade from './routes/Acessibilidade/index.tsx';
import LocalDetalhe from './routes/LocalDetalhe/index.tsx';

const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      { path: "/", element: <Home />, handle: { title: "INÍCIO | ACESSO+" } },
      { path: "/locais", element: <Locais />, handle: { title: "LOCAIS | ACESSO+" } },
      { path: "/locais/:id", element: <LocalDetalhe />, handle: { title: "DETALHES DO LOCAL | ACESSO+" } },
      { path: "/cadastrar", element: <Cadastro />, handle: { title: "CADASTRAR LOCAL | ACESSO+" } },
      { path: "/sobre", element: <Sobre />, handle: { title: "SOBRE | ACESSO+" } },
      { path: "/acessibilidade", element: <Acessibilidade />, handle: { title: "ACESSIBILIDADE | ACESSO+" } },
    ]
  },
  { path: "/*", element: <NotFound />, handle: { title: "PÁGINA NÃO ENCONTRADA | ACESSO+" } }
]);

router.subscribe((state) => {
  const match = state.matches[state.matches.length - 1];

  if (match?.route.handle && typeof match.route.handle === "object") {
    const handle = match.route.handle as { title?: string };

    if (handle.title) {
      document.title = handle.title;
    }
  }
});

const initialMatch = router.state.matches[router.state.matches.length - 1];

if (
  initialMatch?.route.handle &&
  typeof initialMatch.route.handle === "object"
) {
  const handle = initialMatch.route.handle as { title?: string };

  if (handle.title) {
    document.title = handle.title;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


