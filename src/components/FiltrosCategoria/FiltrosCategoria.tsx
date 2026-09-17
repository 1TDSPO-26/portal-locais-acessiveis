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

  const todosSelecionados = selecionados.length === filtros.length;

  return (
    <div className="flex w-full flex-col items-start gap-2 sm:w-auto">
      <label className="flex cursor-pointer items-center gap-1.5 text-[10px] font-medium text-blue-600">
        <input
          type="checkbox"
          checked={todosSelecionados}
          onChange={() =>
            onChange(todosSelecionados ? [] : filtros.map((filtro) => filtro.id))
          }
          className="size-3 accent-blue-600"
          title={todosSelecionados ? "Botão de desmarcar todos os filtros" : "Botão de marcar todos os filtros"}
        />
        <span title={todosSelecionados ? "Botã de desmarcar todos os filtros" : "Botão de marcar todos os filtros"}>Selecionar todos</span>
      </label>

      <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:overflow-visible">
        {filtros.map((filtro, index) => {
          const ativo = selecionados.includes(filtro.id);

          return (
            <div
              key={filtro.id}
              className={
                index === filtros.length - 1
                  ? "relative flex shrink-0 items-center"
                  : "flex shrink-0 items-center"
              }
            >
              {index === filtros.length - 1 && (
                <button
                  type="button"
                  onClick={onClear}
                  disabled={selecionados.length === 0}
                  className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 cursor-pointer whitespace-nowrap px-1 text-[10px] font-medium leading-none text-blue-600 underline-offset-2 transition hover:underline disabled:cursor-not-allowed disabled:text-slate-300 disabled:no-underline p-2"
                  title="Limpar filtros"
                >
                  Limpar filtros
                </button>
              )}

              <button
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
            </div>
          );
        })}
      </div>
    </div>
  );
}