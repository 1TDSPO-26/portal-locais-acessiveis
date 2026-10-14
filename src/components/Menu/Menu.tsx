import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router';
import Button from "../Button/Button";
import BotaoTema from "../BotaoTema/BotaoTema";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const botaoRef = useRef<HTMLButtonElement | null>(null); 

    useEffect(() => { const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                botaoRef.current?.focus(); // Retorna o foco para o botão do menu
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]); // roda quando o estado isOpen muda

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        const handleResize = () => {
            if (window.innerWidth >= 768 && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `relative pb-1 text-sm transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#005FCC] after:transition-all after:duration-300 hover:text-gray-900 hover:after:w-full dark:after:bg-blue-400 dark:hover:text-white ${isActive ? 'font-medium text-gray-900 after:w-full dark:text-white' : 'text-gray-600 after:w-0 dark:text-gray-300'
        }`;

    return (
        <nav className="flex flex-1 items-center">
            <ul className="hidden items-center gap-8 md:absolute md:left-1/2 md:flex md:-translate-x-1/2">
                <li><NavLink to="/" className={linkClass}>Início</NavLink></li>
                <li><NavLink to="/locais" className={linkClass}>Locais</NavLink></li>
                <li><NavLink to="/sobre" className={linkClass}>Sobre</NavLink></li>
                <li><NavLink to="/acessibilidade" className={linkClass}>Acessibilidade</NavLink></li>
            </ul>

            <div className="ml-auto flex items-center gap-3">
            <Button
                to="/cadastrar"
                className="hidden md:inline-flex"
            >
                Adicionar local
            </Button>

            <BotaoTema />

            <button
                ref={botaoRef}
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu-panel"
                className="relative z-50 flex h-6 w-6 flex-col items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005FCC] dark:focus-visible:ring-blue-400 md:hidden"
            >
                <span
                    className={`h-0.5 w-6 rounded-full bg-gray-700 transition-all dark:bg-gray-200 duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''
                        }`}
                />
                <span
                    className={`h-0.5 w-6 rounded-full bg-gray-700 transition-all dark:bg-gray-200 duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'
                        }`}
                />
                <span
                    className={`h-0.5 w-6 rounded-full bg-gray-700 transition-all dark:bg-gray-200 duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''
                        }`}
                />
            </button>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 top-16 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            <div
            id="mobile-menu-panel"
            className={`fixed left-0 right-0 top-16 z-50 overflow-hidden bg-white shadow-xl dark:bg-slate-900 transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-96 border-b border-gray-200 opacity-100 dark:border-slate-700' : 'max-h-0 border-b border-transparent opacity-0 pointer-events-none'}`}
            >
                <ul className="flex flex-col gap-4 px-6 py-4">
                    <li><NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>Início</NavLink></li>
                    <li><NavLink to="/locais" className={linkClass} onClick={() => setIsOpen(false)}>Locais</NavLink></li>
                    <li><NavLink to="/sobre" className={linkClass} onClick={() => setIsOpen(false)}>Sobre</NavLink></li>
                    <li><NavLink to="/acessibilidade" className={linkClass} onClick={() => setIsOpen(false)}>Acessibilidade</NavLink></li>
                    <li>
                        <Button
                            to="/cadastrar"
                            onClick={() => setIsOpen(false)}
                        >
                            Adicionar local
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}