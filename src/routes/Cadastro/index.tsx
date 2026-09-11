import { useState } from "react"
import SeletorTipoLocal from "./components/SeletorTipoLocal"
import Checkboxes from "./components/Checkboxes"
import Observacoes from "./components/Observacoes"

export default function Cadastro() {

    const [nome, setNome] = useState<string>("")
    const [endereco, setEndereco] = useState<string>("")
    const [tipo, setTipo] = useState<string>("")
    const [recursos, setRecursos] = useState<string[]>([])
    const [observacoes, setObservacoes] = useState<string>("")

    const [erros, setErros] = useState<Record<string, string>>({})

    function alternaRecurso(valor: string) {
        if (recursos.includes(valor)) {
            setRecursos(recursos.filter((item) => item !== valor))
        } else {
            setRecursos([...recursos, valor])
        }
    }

    function validar(): Record<string, string> {
        const novosErros: Record<string, string> = {}

        if (!nome.trim()) novosErros.nome = "Informe o nome do local"
        if (!tipo) novosErros.tipo = "Selecione o tipo de local"
        if (!endereco.trim()) novosErros.endereco = "Informe o endereço"
        if (recursos.length === 0) novosErros.recursos = "Marque pelo menos um recurso"

        return novosErros
    }

    function handleSubmit(e: React.FormEvent){
    e.preventDefault()

    const novosErros = validar()
    setErros(novosErros)

    if (Object.keys(novosErros).length === 0) {
        console.log("Dados enviados:", { nome, tipo, endereco, recursos, observacoes })
        alert("Cadastro enviado com sucesso!")

        setNome("")
        setEndereco("")
        setTipo("")
        setRecursos([])
        setObservacoes("")
    }
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

                <button
                    type="submit"
                    className="w-fit rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    Enviar informações
                </button>
            </form>

            <p className="mt-4 text-xs text-slate-400">
                As informações enviadas não representam certificação oficial de acessibilidade.
            </p>
        </main>
    )
}