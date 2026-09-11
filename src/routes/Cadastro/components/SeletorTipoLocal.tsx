interface SeletorTipoLocalProps {
    value: string
    onChange: (valor: string) => void
    error?: string
}

export default function SeletorTipoLocal({ value, onChange, error }: SeletorTipoLocalProps){
    return(
        <div className="flex flex-col gap-2">
            <label htmlFor="tipoLocal" className="text-sm font-semibold text-slate-800">
                Tipo de local
            </label>
            <select
                id="tipoLocal"
                name="tipoLocal"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? "tipoLocal-erro" : undefined}
                className={`min-h-11 w-full min-w-0 rounded-lg border px-3 py-2 text-base sm:text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 ${error ? "border-red-500" : "border-slate-300"}`}
            >
                <option value="" disabled hidden>Selecione uma opção</option>
                <option value="restaurante">Restaurante</option>
                <option value="hospital">Hospital</option>
                <option value="escola">Escola</option>
                <option value="outro">Outro</option>
            </select>
            {error && <p id="tipoLocal-erro" role="alert" className="text-sm text-red-600">{error}</p>}
        </div>
    )
}