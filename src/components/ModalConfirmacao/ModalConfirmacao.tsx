import IconLogo from '../IconLogo/IconLogo';

/**
 * Interface de propriedades do componente ModalConfirmacao
 */
interface ModalConfirmacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

/**
 * Componente Reutilizável de Modal de Confirmação para envios de formulário
 */
export default function ModalConfirmacao({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar Envio",
  message = "Tem certeza de que deseja enviar estas informações?",
}: ModalConfirmacaoProps) {
  // Retorna nulo se o modal estiver fechado
  if (!isOpen) return null;

  return (
    // Backdrop escurecido com desfoque de fundo (backdrop-blur-sm)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Container principal do modal com cantos rounded-2xl */}
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Identidade Visual / Logo */}
        <div className="flex justify-center mb-4">
          <IconLogo />
        </div>

        {/* Título e Mensagem descritiva */}
        <h3 className="text-xl font-bold text-slate-800 text-center mb-2">
          {title}
        </h3>

        <p className="text-slate-600 text-center text-sm mb-6 leading-relaxed">
          {message}
        </p>

        {/* Ações de Cancelamento e Confirmação */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
