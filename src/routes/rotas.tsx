import { Suspense } from "react";
import type { RouteObject } from "react-router";
import App from "../App";
import CarregamentoPagina from "../components/CarregamentoPagina/CarregamentoPagina";
 
import {
  Home,
  Locais,
  LocalDetalhe,
  Cadastro,
  Sobre,
  Acessibilidade,
  NotFound,
} from "./paginas";
 
export const rotas: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "locais", element: <Locais /> },
      { path: "locais/:id", element: <LocalDetalhe /> },
      { path: "cadastrar", element: <Cadastro /> },
      { path: "sobre", element: <Sobre /> },
      { path: "acessibilidade", element: <Acessibilidade /> },
    ],
  },
  {
    path: "*",
    element: (
<Suspense fallback={<CarregamentoPagina />}>
<NotFound />
</Suspense>
    ),
  },
];