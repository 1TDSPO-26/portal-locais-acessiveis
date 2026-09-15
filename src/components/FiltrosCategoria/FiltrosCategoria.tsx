interface FiltrosCategoriaProps {
  selecionados: string[];
  onChange: (selecionados: string[]) => void;
}

const filtros = [
  { id: "entrada", rotulo: "Entrada com rampa" },
  { id: "banheiro", rotulo: "Banheiro acessível" },
  { id: "vagas", rotulo: "Vagas reservadas" },
  { id: "circulacao", rotulo: "Circulação", status: "naoInformado", detalhe: "Não informado" },
  { id: "elevador", rotulo: "Elevador", status: "disponivel", detalhe: "Disponível" }
];

export default function FiltrosCategoria({ selecionados, onChange }: FiltrosCategoriaProps) {
  const alterarFiltro = (id: string) => {
    if (selecionados.includes(id)) {
      onChange(selecionados.filter((item) => item !== id));
      return;
    }

    onChange([...selecionados, id]);
  };

  return (
    <div className="flex gap-2 pb-1">
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
    </div>
  );
};