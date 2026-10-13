// superfícies claras (header, cards e formulários)
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

// superfícies escuras (footer, header escuro)
export const focusRingDark =
  "outline-none focus-visible:ring-2 focus-visible:ring-focus-inverted focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

// Estado visual dos links do rodapé
export function footerLink(isActive: boolean) {
  const base = `block px-4 py-2 rounded-md text-sm leading-5 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 ${focusRingDark}`;
  const state = isActive
    ? "text-white underline underline-offset-4"
    : "text-white/75 hover:text-white";
  return `${base} ${state}`;
}