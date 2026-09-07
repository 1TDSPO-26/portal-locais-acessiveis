export default function Observacoes(){
    return(
        <div className="flex flex-col gap-2">
            <label htmlFor="observacoes">Observações</label>
            <textarea
                id="observacoes"
                name="observacoes"
                rows={4}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40"
            />
        </div>
    )
}