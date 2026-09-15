interface CampoBuscaProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CampoBusca({ value, onChange }: CampoBuscaProps) {
  return (
    <div className="relative w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por local ou endereço..."
        className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500"
      />
    </div>
  );
};