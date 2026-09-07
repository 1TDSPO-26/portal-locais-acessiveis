/**
 * ============================================================
 * STUB — DONO: JÚLIA
 * ============================================================
 * Figma: Section / Skeleton e QA Evidence, seção "3. Loading".
 * "Skeletons preservam a estrutura esperada enquanto os dados
 *  ainda estão carregando."
 *
 * Ou seja: o esqueleto tem que ter o MESMO formato do LocalCard
 * na variante list. Bloco da imagem à esquerda, três barrinhas
 * cinzas à direita simulando título, cidade e badges.
 *
 * Use animate-pulse do Tailwind. Barras em bg-slate-200.
 *
 * ACESSIBILIDADE: colocar aria-hidden="true" no skeleton. Ele é
 * decorativo, o leitor de tela não deve tentar ler barras vazias.
 * Quem anuncia o carregamento é a página, com aria-live.
 */

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4" aria-hidden="true">
      <p className="text-sm text-slate-400">[stub] SkeletonCard</p>
    </div>
  );
}
