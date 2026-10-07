interface EmptyStateProps {
  mensagem?: string;
  onLimparFiltros?: () => void;
}

export const EmptyState = ({
  mensagem = 'Nenhum local acessível encontrado com os filtros selecionados.',
  onLimparFiltros,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
      <p className="text-gray-700 font-medium mb-3">{mensagem}</p>
      {onLimparFiltros && (
        <button
          onClick={onLimparFiltros}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
};

export default EmptyState;
