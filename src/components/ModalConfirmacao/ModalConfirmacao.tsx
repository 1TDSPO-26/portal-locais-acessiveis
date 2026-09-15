import IconLogo from '../IconLogo/IconLogo';

interface ModalConfirmacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ModalConfirmacao({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar Envio",
  message = "Tem certeza de que deseja enviar estas informações?",
}: ModalConfirmacaoProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo do projeto */}
        <div className="flex justify-center mb-4">
          <IconLogo />
        </div>

        {/* Título e Mensagem */}
        <h3 className="text-xl font-bold text-slate-800 text-center mb-2">
          {title}
        </h3>

        <p className="text-slate-600 text-center text-sm mb-6 leading-relaxed">
          {message}
        </p>

        {/* Botões provisórios */}
        <button onClick={onClose}>Cancelar</button>
        <button onClick={onConfirm}>Confirmar</button>
      </div>
    </div>
  );
}
