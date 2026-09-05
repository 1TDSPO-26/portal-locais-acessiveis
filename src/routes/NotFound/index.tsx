export default function NotFound() {
  return (
        
        <main>
            <section className="flex min-h-[70svh] items-start justify-center bg-white px-4 pt-8 text-left sm:px-6 sm:pt-12">
                            <div className="w-full max-w-[620px] rounded-2xl bg-[#EFF6FF] px-8 py-10 sm:px-11 sm:py-12">
                    <h1 className="mb-3 text-4xl font-bold leading-none text-[#0052B4] sm:text-5xl">
                        404
                    </h1>
                    <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight !text-[#0F172A] sm:text-3xl">
                        Página não encontrada
                    </h2>
                    <p className="mb-6 text-base leading-6 text-[#475569]">
                        O endereço que você tentou acessar não existe ou foi alterado.
                    </p>

                    <a href="/"
                        className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#005FCC] px-4 py-2 text-sm font-semibold text-[#FFFFFF] transition-colors hover:bg-[#005FCC] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#0F172A] ">Voltar para o início</a>
                </div>
            </section>
        </main>
  )
}
