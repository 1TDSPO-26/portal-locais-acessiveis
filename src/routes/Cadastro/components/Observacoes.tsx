interface ObservacoesProps {
    value: string
    onChange: (valor: string) => void
}

export default function Observacoes({ value, onChange }: ObservacoesProps){
    return(
        <div className="flex flex-col gap-2">
            <label htmlFor="observacoes">Observações</label>
            <textarea
                id="observacoes"
                name="observacoes"
                rows={4}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full min-w-0 resize-y rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40"
            />
        </div>
    )
}