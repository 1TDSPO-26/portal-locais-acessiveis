interface ErrorStateProps {
  mensagem?: string;
  onTentarNovamente?: () => void;
}

export const ErrorState = ({
  mensagem = 'Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.',
  onTentarNovamente,
}: ErrorStateProps) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center p-6 my-6 bg-red-50 border border-red-200 rounded-lg text-center"
    >
      <p className="text-red-700 font-medium mb-3">{mensagem}</p>
      {onTentarNovamente && (
        <button
          onClick={onTentarNovamente}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default ErrorState;
