interface BadgeAcessibilidadeProps {
  texto: string;
}

export default function BadgeAcessibilidade({ texto }: BadgeAcessibilidadeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[9px] text-green-700">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="size-2.5"
        aria-hidden="true"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>

      {texto}
    </span>
  );
};