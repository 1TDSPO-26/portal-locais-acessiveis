
interface ToastProps {
    message: string
    isOpen: boolean
    onClose: () => void
    type?: "success" | "error"
}

export default function Toast({
    message,
    isOpen,
    onClose,
    type = "success"
}: ToastProps) {
    if (!isOpen) return null

    const isError = type === "error"

    return (
        <div
            role={isError ? "alert" : "status"}
            aria-live={isError ? "assertive" : "polite"}
            aria-atomic="true"
            className={`fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-4 rounded-lg px-4 py-3 text-sm text-white shadow-lg ${
                isError ? "bg-red-700" : "bg-slate-900"
            }`}
        >
            <p>{message}</p>

            <button
                type="button"
                onClick={onClose}
                aria-label="Fechar mensagem"
                className="rounded px-2 py-1 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
                ×
            </button>
        </div>
    )
}
