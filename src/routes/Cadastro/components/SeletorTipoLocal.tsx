interface SeletorTipoLocalProps {
    value: string
    onChange: (valor: string) => void
}

export default function SeletorTipoLocal({ value, onChange }: SeletorTipoLocalProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="tipoLocal">Tipo de local</label>
            <select
                id="tipoLocal"
                name="tipoLocal"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40"
            >
                <option value="">Selecione</option>
                <option value="restaurante">Restaurante</option>
                <option value="hospital">Hospital</option>
                <option value="escola">Escola</option>
                <option value="outro">Outro</option>
            </select>
        </div>
    )
}