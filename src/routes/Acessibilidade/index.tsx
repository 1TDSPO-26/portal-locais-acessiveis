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
        <div className="min-h-screen max-w-4xl mx-auto bg-white px-6 py-10 dark:bg-slate-900">

            {/* Agrupamento semântico dos controles para leitores de tela */}
            <div
                role="group"
                aria-label="Controles de tamanho do texto"
                className="mb-8 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-600"
            >
                <span
                    className="mr-2 font-medium text-slate-700 dark:text-slate-300"
                    style={{ fontSize: `${1 * fontScale}rem` }}
                >
                    Tamanho do texto:
                </span>

                <button
                    onClick={decreaseText}
                    className="rounded bg-slate-100 px-3 py-1.5 font-medium text-slate-800 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    aria-label="Diminuir tamanho do texto"
                >
                    A-
                </button>

                <button
                    onClick={resetText}
                    className="rounded bg-slate-100 px-3 py-1.5 font-medium text-slate-800 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    aria-label="Tamanho original do texto"
                >
                    A
                </button>

                <button
                    onClick={increaseText}
                    className="rounded bg-slate-100 px-3 py-1.5 font-medium text-slate-800 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    aria-label="Aumentar tamanho do texto"
                >
                    A+
                </button>
            </div>

            <h1
                className="mb-8 font-bold text-slate-900 dark:text-slate-100"
                style={{ fontSize: `${1.875 * fontScale}rem` }}
            >
                Acessibilidade
            </h1>

            <section className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-600 dark:bg-slate-800">
                <h2
                    className="mb-2 font-bold text-slate-900 dark:text-slate-100"
                    style={{ fontSize: `${1.125 * fontScale}rem` }}
                >
                    Nosso compromisso
                </h2>

                <p
                    className="leading-relaxed text-slate-600 dark:text-slate-300"
                    style={{ fontSize: `${1 * fontScale}rem` }}
                >
                    O Portal de Locais e Serviços Acessíveis existe para facilitar a
                    vida de pessoas com deficiência, mobilidade reduzida ou qualquer
                    necessidade específica na hora de escolher onde ir. Buscamos
                    seguir boas práticas de acessibilidade digital em todas as
                    páginas da aplicação.
                </p>
            </section>

            <section className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-600 dark:bg-slate-800">
                <h2
                    className="mb-2 font-bold text-slate-900 dark:text-slate-100"
                    style={{ fontSize: `${1.125 * fontScale}rem` }}
                >
                    Recursos de acessibilidade do site
                </h2>

                <p
                    className="leading-relaxed text-slate-600 dark:text-slate-300"
                    style={{ fontSize: `${1 * fontScale}rem` }}
                >
                    Utilizamos marcação semântica, navegação por teclado, textos
                    alternativos em imagens e contraste adequado para garantir que o
                    portal possa ser usado por leitores de tela e outras tecnologias
                    assistivas.
                </p>
            </section>

            <section className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-600 dark:bg-slate-800">
                <h2
                    className="mb-2 font-bold text-slate-900 dark:text-slate-100"
                    style={{ fontSize: `${1.125 * fontScale}rem` }}
                >
                    Encontrou um problema?
                </h2>

                <p
                    className="leading-relaxed text-slate-600 dark:text-slate-300"
                    style={{ fontSize: `${1 * fontScale}rem` }}
                >
                    Se você encontrar alguma barreira de acessibilidade neste site,
                    entre em contato através da nossa página de{' '}

                    <Button
                        to="/sobre"
                        className="font-medium text-blue-600 underline hover:text-white-800 dark:text-blue-300"
                    >
                        Sobre
                    </Button>
                    {" "}para que possamos corrigir.
                </p>
            </section>
        </div>
    );
}