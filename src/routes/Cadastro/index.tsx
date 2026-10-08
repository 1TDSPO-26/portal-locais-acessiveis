import { useEffect, useState } from "react"
import SeletorTipoLocal from "../../components/SeletorTipoLocal/SeletorTipoLocal"
import Checkboxes from "../../components/Checkboxes/Checkboxes"
import Observacoes from "../../components/Observacoes/Observacoes"
import ModalConfirmacao from "../../components/ModalConfirmacao/ModalConfirmacao"
import Button from "../../components/Button/Button";
import Toast from "../../components/Toast/Toast"

export default function Cadastro() {

    useEffect(() => {
        document.title = "CADASTRO | ACESSO+";
    }, []);

    const [nome, setNome] = useState<string>("")
    const [endereco, setEndereco] = useState<string>("")
    const [tipo, setTipo] = useState<string>("")
    const [recursos, setRecursos] = useState<string[]>([])
    const [observacoes, setObservacoes] = useState<string>("")

    const [erros, setErros] = useState<Record<string, string>>({})
    const [modalAberto, setModalAberto] = useState<boolean>(false)
    const [toastAberto, setToastAberto] = useState<boolean>(false)

    function alternaRecurso(valor: string) {
        if (recursos.includes(valor)) {
            setRecursos(recursos.filter((item) => item !== valor))
        } else {
            setRecursos([...recursos, valor])
        }
    }

    function normalizar() {
        return {
            nome: nome.trim(),
            tipo: tipo.trim(),
            endereco: endereco.trim(),
            recursos: [...new Set(
                recursos
                    .map((recurso) => recurso.trim())
                    .filter(Boolean))],
            observacoes: observacoes.trim(),
        }
    }

    function validar(dados: ReturnType<typeof normalizar>): Record<string, string> {
        const novosErros: Record<string, string> = {}

        const tiposValidos = [
            "restaurante",
            "hospital",
            "escola",
            "Outro",
        ]

        const recursosValidos = [
            "rampa",
            "banheiro",
            "circulacao",
            "vaga",
            "elevador",
        ]

        if (!dados.nome) novosErros.nome = "Informe o nome do local"
        if (!tiposValidos.includes(dados.tipo)) novosErros.tipo = "Selecione o tipo de local"
        if (!dados.endereco) novosErros.endereco = "Informe o endereço"
        if (dados.recursos.length === 0) {
            novosErros.recursos = "Marque pelo menos um recurso"
        } else if (dados.recursos.some((recurso) => !recursosValidos.includes(recurso))) novosErros.recursos = "Selecione apenas recursos válidos"

        return novosErros
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const dados = normalizar()

        const novosErros = validar(dados)
        setErros(novosErros)

        if (Object.keys(novosErros).length === 0) {
            setNome(dados.nome)
            setTipo(dados.tipo)
            setEndereco(dados.endereco)
            setRecursos(dados.recursos)
            setObservacoes(dados.observacoes)
            setModalAberto(true)
        }
    }

    function confirmarEnvio() {
        console.log("Dados enviados:", { nome, tipo, endereco, recursos, observacoes })

        setNome("")
        setEndereco("")
        setTipo("")
        setRecursos([])
        setObservacoes("")

        setModalAberto(false)
        setToastAberto(true)
    }

    function cancelarEnvio() {
        setModalAberto(false)
    }

    return (
        <main className="mx-auto max-w-4xl px-4 py-10">
            <h1 className="text-3xl font-bold text-slate-900">
                Adicionar informações de um local
            </h1>
            <p className="mt-2 text-sm text-slate-500">
                Compartilhe o que você sabe. Se não tiver certeza sobre algum recurso,
                deixe claro que a informação não foi confirmada.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="nomeLocal" className="text-sm font-semibold text-slate-800">
                        Nome do local
                    </label>
                    <input
                        type="text"
                        id="nomeLocal"
                        name="nomeLocal"
                        placeholder="Digite o nome do local"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        aria-invalid={!!erros.nome}
                        aria-describedby={erros.nome ? "nomeLocal-erro" : undefined}
                        className={`rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 ${erros.nome ? "border-red-500" : "border-slate-300"}`}
                    />
                    {erros.nome && <p id="nomeLocal-erro" role="alert" className="text-sm text-red-600">{erros.nome}</p>}
                </div>

                <SeletorTipoLocal value={tipo} onChange={setTipo} error={erros.tipo} />

                <div className="flex flex-col gap-2">
                    <label htmlFor="endereco" className="text-sm font-semibold text-slate-800">
                        Endereço
                    </label>
                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        placeholder="Rua, número, cidade e estado"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        aria-invalid={!!erros.endereco}
                        aria-describedby={erros.endereco ? "endereco-erro" : undefined}
                        className={`rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 ${erros.endereco ? "border-red-500" : "border-slate-300"}`}
                    />
                    {erros.endereco && <p id="endereco-erro" role="alert" className="text-sm text-red-600">{erros.endereco}</p>}
                </div>

                <fieldset aria-describedby={erros.recursos ? "recursos-erro" : undefined}>
                    <legend className="text-base font-semibold text-slate-900">Recursos de acessibilidade</legend>
                    <p className="mt-1 text-sm text-slate-500">Marque apenas o que você consegue confirmar.</p>
                    <div className="mt-3">
                        <Checkboxes selecionados={recursos} onToggle={alternaRecurso} error={erros.recursos} />
                    </div>
                </fieldset>

                <Observacoes value={observacoes} onChange={setObservacoes} />

                <Button
                    type="submit"
                    className="w-fit px-5 py-2.5 font-semibold"
                >
                    Enviar informações
                </Button>
            </form>

            <p className="mt-4 text-xs text-slate-400">
                As informações enviadas não representam certificação oficial de acessibilidade.
            </p>

            <ModalConfirmacao
                isOpen={modalAberto}
                onClose={cancelarEnvio}
                onConfirm={confirmarEnvio}
                title="Confirmar envio das informações?"
                message="Revise os dados antes de continuar. Após a confirmação, as informações do local serão enviadas."
            />

            <Toast
                message="Informações enviadas com sucesso!"
                isOpen={toastAberto}
                onClose={() => setToastAberto(false)}
            />
        </main>
    )
}