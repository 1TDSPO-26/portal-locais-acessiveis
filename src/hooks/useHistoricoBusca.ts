import { useEffect, useState } from 'react';

export const CHAVE_HISTORICO_BUSCA = 'portalLocaisHistoricoBusca';
export const LIMITE_HISTORICO_BUSCA = 5;
const TAMANHO_MINIMO_TERMO = 2;

// Lê o histórico salvo; se o valor estiver corrompido ou o navegador
// bloquear o localStorage, começa com a lista vazia.
function lerHistoricoSalvo(): string[] {
  try {
    const salvo = localStorage.getItem(CHAVE_HISTORICO_BUSCA);
    const lista: unknown = salvo ? JSON.parse(salvo) : [];

    if (!Array.isArray(lista)) return [];

    return lista
      .filter((item): item is string => typeof item === 'string')
      .slice(0, LIMITE_HISTORICO_BUSCA);
  } catch {
    return [];
  }
}

// Coloca o termo no topo, remove a versão repetida (sem diferenciar
// maiúsculas/minúsculas) e respeita o limite de itens.
export function adicionarAoHistorico(historico: string[], termo: string): string[] {
  const termoLimpo = termo.trim().replace(/\s+/g, ' ');

  if (termoLimpo.length < TAMANHO_MINIMO_TERMO) return historico;

  const semRepetido = historico.filter(
    (item) => item.toLowerCase() !== termoLimpo.toLowerCase(),
  );

  return [termoLimpo, ...semRepetido].slice(0, LIMITE_HISTORICO_BUSCA);
}

export function useHistoricoBusca() {
  const [historico, setHistorico] = useState<string[]>(lerHistoricoSalvo);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_HISTORICO_BUSCA, JSON.stringify(historico));
    } catch {
      // Sem localStorage o histórico continua funcionando só nesta sessão.
    }
  }, [historico]);

  const salvarBusca = (termo: string) => {
    setHistorico((atual) => adicionarAoHistorico(atual, termo));
  };

  const removerBusca = (termo: string) => {
    setHistorico((atual) => atual.filter((item) => item !== termo));
  };

  const limparHistorico = () => {
    setHistorico([]);
  };

  return { historico, salvarBusca, removerBusca, limparHistorico };
}
