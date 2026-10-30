interface ErroConsultaProps {
  titulo: string;
  mensagem: string;
  tentando: boolean;
  onTentarNovamente: () => void;
}

// Painel exibido quando a consulta à API falha. O painel continua visível
// durante a nova tentativa, com o botão desabilitado e um spinner, para que
// o usuário saiba que algo está acontecendo e não dispare cliques repetidos.
export default function ErroConsulta({
  titulo,
  mensagem,
  tentando,
  onTentarNovamente,
}: ErroConsultaProps) {
  return (
    <div
      role="alert"
      className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 px-6 text-center dark:border-red-800 dark:bg-red-950"
    >
      <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
        {titulo}
      </h2>

      <p className="mt-2 text-sm text-red-700 dark:text-red-300">{mensagem}</p>

      <button
        type="button"
        onClick={onTentarNovamente}
        disabled={tentando}
        aria-busy={tentando}
        className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005FCC] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-blue-600"
      >
        {tentando && (
          <span
            aria-hidden="true"
            data-testid="spinner-retry"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
        )}
        {tentando ? "Tentando novamente..." : "Tentar novamente"}
      </button>
    </div>
  );
}