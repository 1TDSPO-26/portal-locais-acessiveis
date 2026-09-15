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
    /* Fundo escuro com backdrop-blur-sm e clique para fechar */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      /* Caixa do modal com cantos rounded-2xl e stopPropagation */
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Cancelar</button>
        <button onClick={onConfirm}>Confirmar</button>
      </div>
    </div>
  );
}