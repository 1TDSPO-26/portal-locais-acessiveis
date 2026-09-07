import type { Local } from "../types";
import { LocalCard } from "./LocalCard";

/**
 * ============================================================
 * STUB — DONO: JÚLIA
 * ============================================================
 * Figma: tela "Locais / Desktop" e "Locais / Mobile".
 *
 * Este componente NÃO decide o que tem dentro do card. Ele só recebe
 * a lista pronta e repete o LocalCard. Por isso você consegue trabalhar
 * agora, mesmo com o card do Nezio ainda em stub.
 *
 * O QUE FAZER:
 *   1. Se carregando === true, mostrar 3 ou 4 SkeletonCard no lugar da lista
 *   2. Se a lista estiver vazia, mostrar o EstadoVazio
 *   3. Caso contrário, repetir o LocalCard com variante="list"
 *
 * LAYOUT: no /locais os cards são empilhados em coluna única, um embaixo
 * do outro, com espaçamento entre eles (space-y-4). NÃO é grid de 3 colunas.
 * O grid de 3 colunas é da Home, que é de outro grupo.
 *
 * ACESSIBILIDADE: envolver a lista numa <ul> com <li> por card, ou usar
 * role="list". Leitor de tela anuncia "lista com 7 itens", o que ajuda muito.
 *
 * Não esqueça a key={local.id} no map, senão o React reclama no console
 * e o lint acusa.
 */

interface ListaLocaisProps {
  locais: Local[];
  carregando?: boolean;
}

export function ListaLocais({ locais, carregando = false }: ListaLocaisProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        [stub] ListaLocais · {locais.length} locais · carregando: {String(carregando)}
      </p>
      {locais.map((local) => (
        <LocalCard key={local.id} local={local} variante="list" />
      ))}
    </div>
  );
}
