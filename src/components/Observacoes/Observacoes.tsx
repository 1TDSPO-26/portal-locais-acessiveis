interface ObservacoesProps {
    value: string
    onChange: (valor: string) => void
}

export default function Observacoes({ value, onChange }: ObservacoesProps){
    return(
        <div className="flex flex-col gap-2 mt-8">
            <label htmlFor="observacoes" className="text-sm font-semibold text-slate-800">
                Observações
            </label>
            <textarea
                id="observacoes"
                name="observacoes"
                rows={4}
                placeholder="Inclua detalhes úteis sobre o acesso"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full min-w-0 resize-none rounded-lg border border-slate-500 px-3 py-2 text-base sm:text-sm text-slate-900 placeholder:text-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-[#005FCC]"
            />
        </div>
    )
}