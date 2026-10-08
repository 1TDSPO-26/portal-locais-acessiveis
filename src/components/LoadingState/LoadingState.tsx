export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-6 text-center" aria-live="polite">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-sm font-medium text-gray-600">
        Carregando locais acessíveis...
      </p>
    </div>
  );
};

export default LoadingState;
