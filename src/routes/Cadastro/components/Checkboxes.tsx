interface CheckboxProps {
    label: string
    valor: string
    checked: boolean
    onChange: (valor: string) => void
}

function Checkbox({ label, valor, checked, onChange }: CheckboxProps){
    const id = "recurso-" + valor

    return(
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={() => onChange(valor)}
                className="focus-visible:ring-2 focus-visible:ring-cyan-500/40"
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

interface ChecklistProps {
    selecionados: string[]
    onToggle: (valor: string) => void
    error?: string
}

const opcoes = [
    { valor: "rampa", label: "Entrada com rampa ou acesso em nível" },
    { valor: "banheiro", label: "Banheiro acessível" },
    { valor: "vaga", label: "Vaga reservada" },
    { valor: "circulacao", label: "Espaço interno para circulação" },
    { valor: "elevador", label: "Elevador quando necessário" },
]

export default function Checkboxes({ selecionados, onToggle, error }: ChecklistProps){
    return(
        <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Recursos de acessibilidade</h2>
            <p className="text-sm text-slate-600">Marque apenas o que você consegue confirmar.</p>

            <div className="flex flex-col gap-2">
                {opcoes.map((opcao) => (
                    <Checkbox
                        key={opcao.valor}
                        label={opcao.label}
                        valor={opcao.valor}
                        checked={selecionados.includes(opcao.valor)}
                        onChange={onToggle}
                    />
                ))}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </section>
    )
}