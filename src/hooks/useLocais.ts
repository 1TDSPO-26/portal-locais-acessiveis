import { useEffect, useState } from "react";
import { buscarLocais } from "../services/locaisService";
import type { Local } from "../types/locais";

export function useLocais() {
  const [locais, setLocais] = useState<Local[]>([]);
  const [offline, setOffline] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarLocais().then(({ locais, origem }) => {
      setLocais(locais);
      setOffline(origem !== "api");
      setCarregando(false);
    });
  }, []);

  return { locais, offline, carregando };
}