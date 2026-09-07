import type { CategoriaLocal } from "../types";

/**
 * Tag de categoria. Figma: Section / Tag.
 * Aparece no canto direito do card e ao lado do título na tela de detalhes.
 *
 * DONO: Nezio. Já vem pronto no scaffold porque três pessoas usam.
 * Se precisar de outra cor, fala no grupo em vez de criar uma segunda Tag.
 */

interface TagProps {
  categoria: CategoriaLocal;
}

export function Tag({ categoria }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
      {categoria}
    </span>
  );
}
