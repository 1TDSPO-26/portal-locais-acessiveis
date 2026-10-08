interface AvisoOfflineProps {
  offline: boolean;
}

export default function AvisoOffline({ offline }: AvisoOfflineProps) {
  return (
    <div role="status" aria-live="polite">
      {offline && (
        <p className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-start text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
          Você está offline ou o serviço está indisponível. Exibindo dados
          salvos neste dispositivo.
        </p>
      )}
    </div>
  );
}