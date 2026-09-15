export default function Acessibilidade() {
    return ( 
        <main className="bg-white min-h-screen px-6 py-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Acessibilidade</h1>

            <section className="border border-slate-200 rounded-xl bg-slate-50 p-6 mb-6" >
                <h2 className="text-lg font-bold text-slate-900 mb-2">Nosso compromisso</h2>
                <p className="text-slate-600 leading-relaxed">
                    O Portal de Locais e Serviços Acessíveis existe para facilitar a
                    vida de pessoas com deficiência, mobilidade reduzida ou qualquer
                    necessidade específica na hora de escolher onde ir. Buscamos
                    seguir boas práticas de acessibilidade digital em todas as
                    páginas da aplicação.
                </p>
            </section>

            <section className="border border-slate-200 rounded-xl bg-slate-50 p-6 mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-2">Recursos de acessibilidade do site</h2>
                <p className="text-slate-600 leading-relaxed">
                    Utilizamos marcação semântica, navegação por teclado, textos
                    alternativos em imagens e contraste adequado para garantir que o
                    portal possa ser usado por leitores de tela e outras tecnologias
                    assistivas.
                </p>
            </section>

            <section className="border border-slate-200 rounded-xl bg-slate-50 p-6 mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-2">Encontrou um problema?</h2>
                <p className="text-slate-600 leading-relaxed">
                    Se você encontrar alguma barreira de acessibilidade neste site,
                    entre em contato através da nossa página de{' '}
                    <a href="/sobre" className="text-blue-600 font-medium hover:text-blue-800 underline">Sobre</a> para que possamos corrigir.
                </p>
            </section>
        </main>
    );
}