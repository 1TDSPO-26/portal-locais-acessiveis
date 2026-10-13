import { lazy } from "react";

export const Home = lazy(() => import("./Home/index"));
export const Locais = lazy(() => import("./Locais/index"));
export const LocalDetalhe = lazy(() => import("./LocalDetalhe/index"));
export const Cadastro = lazy(() => import("./Cadastro/index"));
export const Sobre = lazy(() => import("./Sobre/index"));
export const Acessibilidade = lazy(() => import("./Acessibilidade/index"));
export const NotFound = lazy(() => import("./NotFound/index"));