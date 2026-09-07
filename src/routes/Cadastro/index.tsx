import { useState } from "react"
import SeletorTipoLocal from "./components/SeletorTipoLocal"
import Checkboxes from "./components/Checkboxes"
import Observacoes from "./components/Observacoes"

export default function Cadastro(){

    const [nome, setNome] = useState<string>("")
    const [endereco, setEndereco] = useState<string>("")
    const [tipo, setTipo] = useState<string>("")
    const [recursos, setRecursos] = useState<string[]>([])
    const [observacoes, setObservacoes] = useState<string>("")

    const [erros, setErros] = useState<Record<string, string>>({})

    function alternaRecurso(valor: string){
        if (recursos.includes(valor)) {
            setRecursos(recursos.filter((item) => item !== valor))
        } else {
            setRecursos([...recursos, valor])
        }
    }

    function validar(): Record<string, string> {
        const novosErros: Record<string, string> = {}

        if (!nome.trim()) novosErros.nome = "Informe o nome do local"
        if (!endereco.trim()) novosErros.endereco = "Informe o endereço"
        if (!tipo) novosErros.tipo = "Selecione o tipo de local"
        if (recursos.length === 0) novosErros.recursos = "Marque pelo menos um recurso"

        return novosErros
    }

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        const novosErros = validar()
        setErros(novosErros)

        if (Object.keys(novosErros).length === 0) {
            console.log("Dados enviados:", { nome, endereco, tipo, recursos, observacoes })
            alert("Cadastro enviado com sucesso!")
        }
    }

    return(
        <main className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="text-2xl font-bold text-slate-900">Cadastro</h1>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="nomeLocal">Nome do local</label>
                    <input
                        type="text"
                        id="nomeLocal"
                        name="nomeLocal"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className={`rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 ${erros.nome ? "border-red-500" : "border-slate-300"}`}
                    />
                    {erros.nome && <p className="text-sm text-red-600">{erros.nome}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="endereco">Endereço</label>
                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        className={`rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 ${erros.endereco ? "border-red-500" : "border-slate-300"}`}
                    />
                    {erros.endereco && <p className="text-sm text-red-600">{erros.endereco}</p>}
                </div>

                <SeletorTipoLocal value={tipo} onChange={setTipo} error={erros.tipo} />

                <Checkboxes selecionados={recursos} onToggle={alternaRecurso} error={erros.recursos} />

                <Observacoes value={observacoes} onChange={setObservacoes} />

                <button type="submit" className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white">
                    Enviar
                </button>
            </form>
        </main>
    )
}