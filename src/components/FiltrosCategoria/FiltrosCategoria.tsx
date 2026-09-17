interface FiltrosCategoriaProps {
  selecionados: string[];
  onChange: (selecionados: string[]) => void;
  onClear: () => void;
}

const filtros = [
  { id: "entrada", rotulo: "Entrada com rampa" },
  { id: "banheiro", rotulo: "Banheiro acessível" },
  { id: "vagas", rotulo: "Vagas reservadas" },
  { id: "circulacao", rotulo: "Circulação" },
  { id: "elevador", rotulo: "Elevador" },
];

export default function FiltrosCategoria({
  selecionados,
  onChange,
  onClear,
}: FiltrosCategoriaProps) {
  const alterarFiltro = (id: string) => {
    if (selecionados.includes(id)) {
      onChange(selecionados.filter((item) => item !== id));
      return;
    }

    onChange([...selecionados, id]);
  };

  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:overflow-visible">
      {filtros.map((filtro) => {
        const ativo = selecionados.includes(filtro.id);

        return (
          <button
            key={filtro.id}
            type="button"
            onClick={() => alterarFiltro(filtro.id)}
            className={`cursor-pointer whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] transition ${
              ativo
                ? "bg-blue-600 text-white"
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            }`}
          >
            {filtro.rotulo}
          </button>
        );
      })}

      <button
        type="button"
        onClick={onClear}
        disabled={selecionados.length === 0}
        className="cursor-pointer whitespace-nowrap px-1 py-1 text-[10px] font-medium text-blue-600 underline-offset-2 transition hover:underline disabled:cursor-not-allowed disabled:text-slate-300 disabled:no-underline"
      >
        Clear
      </button>
    </div>
  );
}