import { useState } from "react"
import ModalConfirmacao from "../../components/ModalConfirmacao/ModalConfirmacao"

export default function TesteModal() {
    const [aberto, setAberto] = useState(true)

    return (
        <div className="mx-auto max-w-xl px-4 py-10">
            <button
                type="button"
                onClick={() => setAberto(true)}
                className="inline-flex items-center justify-center rounded-lg bg-[#005FCC] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700"
            >
                Abrir modal
            </button>

            <ModalConfirmacao
                isOpen={aberto}
                onClose={() => setAberto(false)}
                onConfirm={() => setAberto(false)}
            />
        </div>
    )
}