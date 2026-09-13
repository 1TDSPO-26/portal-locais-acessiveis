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
                className="h-4 w-4 rounded border-slate-300 focus-visible:ring-2 focus-visible:ring-cyan-500/40"
            />
            <label htmlFor={id} className="text-sm text-slate-700">{label}</label>
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
        <div className="flex flex-col gap-6">
            {opcoes.map((opcao) => (
                <Checkbox
                    key={opcao.valor}
                    label={opcao.label}
                    valor={opcao.valor}
                    checked={selecionados.includes(opcao.valor)}
                    onChange={onToggle}
                />
            ))}
            {error && <p id="recursos-erro" role="alert" className="text-sm text-red-600">{error}</p>}
        </div>
    )
}