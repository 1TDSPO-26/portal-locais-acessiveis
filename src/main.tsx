import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router';

// Import das rotas
import Home from  './routes/Home/index.tsx';
import Locais from './routes/Locais/index.tsx';
import Cadastro from './routes/Cadastro/index.tsx';
import Sobre from './routes/Sobre/index.tsx';

const router = createBrowserRouter([
  {path:"/", element:<App/>, children: [
    {path:"/", element:<Home/>},
    {path:"/locais", element:<Locais/>},
    {path:"/cadastrar", element:<Cadastro/>},
    {path:"/sobre", element:<Sobre/>},
  ]}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


