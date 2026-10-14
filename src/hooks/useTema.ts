import { useState, useEffect } from 'react';

type Tema = 'claro' | 'escuro';
const CHAVE = 'portalLocaisTema';

function temaInicial(): Tema {
  const salvo = localStorage.getItem(CHAVE);

  if (salvo === 'claro' || salvo === 'escuro') {
    return salvo;
  }

  const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return sistemaEscuro ? 'escuro' : 'claro';
}

export function useTema() {
  const [tema, setTema] = useState<Tema>(temaInicial);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'escuro');
    localStorage.setItem(CHAVE, tema);
  }, [tema]);

  const alternarTema = () => {
    setTema((temaAtual) => (temaAtual === 'claro' ? 'escuro' : 'claro'));
  };

  return { tema, alternarTema };
}
