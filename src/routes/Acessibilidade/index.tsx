import Button from "../../components/Button/Button";
import { useEffect, useState } from 'react';

export default function Acessibilidade() {
    const [fontScale, setFontScale] = useState(1);

    // Funções de controle com limites para não quebrar o layout
    const increaseText = () => setFontScale(prev => Math.min(prev + 0.1, 1.5)); // Máximo de 1.5x
    const decreaseText = () => setFontScale(prev => Math.max(prev - 0.1, 0.8)); // Mínimo de 0.8x
    const resetText = () => setFontScale(1);

    useEffect(() => {
        document.title = "ACESSIBILIDADE | ACESSO+";
    }, []);

    return (
        <div className="bg-white min-h-screen px-6 py-10 max-w-4xl mx-auto">
            
            {/* Agrupamento semântico dos controles para leitores de tela */}
            <div 
                role="group" 
                aria-label="Controles de tamanho do texto"
                className="flex items-center flex-wrap gap-2 mb-8 pb-4 border-b border-slate-200"
            >
                <span className="text-slate-700 font-medium mr-2" style={{ fontSize: `${1 * fontScale}rem` }}>
                    Tamanho do texto:
                </span>
                <button 
                    onClick={decreaseText} 
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                    aria-label="Diminuir tamanho do texto"
                >
                    A-
                </button>
                <button 
                    onClick={resetText} 
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                    aria-label="Tamanho original do texto"
                >
                    A
                </button>
                <button 
                    onClick={increaseText} 
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                    aria-label="Aumentar tamanho do texto"
                >
                    A+
                </button>
            </div>

            <h1 className="font-bold text-slate-900 mb-8" style={{ fontSize: `${1.875 * fontScale}rem` }}>
                Acessibilidade
            </h1>

            <section className="border border-slate-200 rounded-xl bg-slate-50 p-6 mb-6">
                <h2 className="font-bold text-slate-900 mb-2" style={{ fontSize: `${1.125 * fontScale}rem` }}>
                    Nosso compromisso
                </h2>
                <p className="text-slate-600 leading-relaxed" style={{ fontSize: `${1 * fontScale}rem` }}>
                    O Portal de Locais e Serviços Acessíveis existe para facilitar a
                    vida de pessoas com deficiência, mobilidade reduzida ou qualquer
                    necessidade específica na hora de escolher onde ir. Buscamos
                    seguir boas práticas de acessibilidade digital em todas as
                    páginas da aplicação.
                </p>
            </section>

            <section className="border border-slate-200 rounded-xl bg-slate-50 p-6 mb-6">
                <h2 className="font-bold text-slate-900 mb-2" style={{ fontSize: `${1.125 * fontScale}rem` }}>
                    Recursos de acessibilidade do site
                </h2>
                <p className="text-slate-600 leading-relaxed" style={{ fontSize: `${1 * fontScale}rem` }}>
                    Utilizamos marcação semântica, navegação por teclado, textos
                    alternativos em imagens e contraste adequado para garantir que o
                    portal possa ser usado por leitores de tela e outras tecnologias
                    assistivas.
                </p>
            </section>

            <section className="border border-slate-200 rounded-xl bg-slate-50 p-6 mb-6">
                <h2 className="font-bold text-slate-900 mb-2" style={{ fontSize: `${1.125 * fontScale}rem` }}>
                    Encontrou um problema?
                </h2>
                <p className="text-slate-600 leading-relaxed" style={{ fontSize: `${1 * fontScale}rem` }}>
                    Se você encontrar alguma barreira de acessibilidade neste site,
                    entre em contato através da nossa página de{' '}
                    
                    <Button to="/sobre" className="text-blue-600 font-medium hover:text-white-800 underline">Sobre</Button> para que possamos corrigir.
                </p>
            </section>
        </div>
    );
}