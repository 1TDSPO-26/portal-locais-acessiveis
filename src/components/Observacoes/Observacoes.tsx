interface ObservacoesProps {
  value: string;
  onChange: (valor: string) => void;
  error?: string;
}

export default function Observacoes({
  value,
  onChange,
  error,
}: ObservacoesProps) {
  return (
    <div className="flex flex-col gap-2 mt-8">
      <label
        htmlFor="observacoes"
        className="text-sm font-semibold text-slate-800 dark:text-slate-200"
      >
        Observações (obrigatório)
      </label>

      <textarea
        id="observacoes"
        name="observacoes"
        rows={4}
        placeholder="Inclua detalhes úteis sobre o acesso"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby={error ? "observacoes-erro" : undefined}
        className={`w-full min-w-0 resize-none rounded-lg border px-3 py-2 text-base sm:text-sm text-slate-900 placeholder:text-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-[#005FCC] ${
          error ? "border-red-500" : "border-slate-500"
        }`}
      />

      {error && (
        <p
          id="observacoes-erro"
          role="alert"
          className="text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}