interface FiltrosCategoriaProps {
  selecionados: string[];
  onChange: (selecionados: string[]) => void;
  onClear: () => void;
}
//Filtros de pesquisa da página de pesquisa de estabelecimentos, com a possibilidade de selecionar todos os filtros ou limpar todos os filtros selecionados.
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
  const alternarTodos = () => {
    onChange(todosSelecionados ? [] : filtros.map((filtro) => filtro.id));
  };

  return (
    <div className="flex w-full flex-col items-start gap-2 sm:w-auto">
      <div className="flex w-full items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-1.5 text-[10px] font-medium text-blue-600">
          <input
            type="checkbox"
            checked={todosSelecionados}
            onChange={alternarTodos}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                alternarTodos();
              }
            }}
            aria-label="Selecionar todos os filtros"
            className="size-3 accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            title={
              todosSelecionados
                ? "Botão de desmarcar todos os filtros"
                : "Botão de marcar todos os filtros"
            }
          />
          <span
            title={
              todosSelecionados
                ? "Botão de desmarcar todos os filtros"
                : "Botão de marcar todos os filtros"
            }
          >
            Selecionar todos
          </span>
        </label>

        <button
          type="button"
          onClick={onClear}
          disabled={selecionados.length === 0}
          className="shrink-0 cursor-pointer whitespace-nowrap px-1 text-[10px] font-medium leading-none text-blue-600 underline-offset-2 transition hover:underline disabled:cursor-not-allowed disabled:text-slate-300 disabled:no-underline"
          title="Limpar filtros"
        >
          Limpar filtros
        </button>
      </div>

      <div className="flex w-full flex-wrap items-center gap-2 pb-1 sm:w-auto sm:flex-nowrap sm:overflow-visible">
        {filtros.map((filtro) => {
          const ativo = selecionados.includes(filtro.id);

          return (
            <div key={filtro.id} className="flex shrink-0 items-center">
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
