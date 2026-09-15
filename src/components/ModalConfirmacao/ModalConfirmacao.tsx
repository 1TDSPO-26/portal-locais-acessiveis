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
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={onClose}>Cancelar</button>
      <button onClick={onConfirm}>Confirmar</button>
    </div>
  );
}
