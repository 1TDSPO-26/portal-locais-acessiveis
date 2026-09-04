import { useState } from 'react';
import { NavLink } from 'react-router';

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const linkClass = ({ isActive }) =>
        `relative pb-1 text-sm transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#005FCC] after:transition-all after:duration-300 hover:text-gray-900 hover:after:w-full ${
            isActive ? 'font-medium text-gray-900 after:w-full' : 'text-gray-600 after:w-0'
        }`;

    return (
        <nav className="flex flex-1 items-center">
            <ul className="hidden items-center gap-8 md:absolute md:left-1/2 md:flex md:-translate-x-1/2">
                <li><NavLink to="/" className={linkClass}>Início</NavLink></li>
                <li><NavLink to="/locais" className={linkClass}>Locais</NavLink></li>
                <li><NavLink to="/sobre" className={linkClass}>Sobre</NavLink></li>
            </ul>

            <NavLink
                to="/cadastrar"
                className="ml-auto hidden items-center justify-center rounded-lg bg-[#005FCC] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.03] hover:bg-blue-700 active:scale-95 md:inline-flex"
            >
                Adicionar local
            </NavLink>

            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Abrir menu"
                aria-expanded={isOpen}
                className="relative ml-auto flex h-6 w-6 flex-col items-center justify-center gap-1.5 md:hidden"
            >
                <span
                    className={`h-0.5 w-6 rounded-full bg-gray-700 transition-all duration-300 ${
                        isOpen ? 'translate-y-2 rotate-45' : ''
                    }`}
                />
                <span
                    className={`h-0.5 w-6 rounded-full bg-gray-700 transition-all duration-300 ${
                        isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                />
                <span
                    className={`h-0.5 w-6 rounded-full bg-gray-700 transition-all duration-300 ${
                        isOpen ? '-translate-y-2 -rotate-45' : ''
                    }`}
                />
            </button>

            <div
                className={`absolute left-0 right-0 top-full overflow-hidden bg-white transition-all duration-300 ease-in-out md:hidden ${
                    isOpen ? 'max-h-96 border-t border-gray-200 opacity-100' : 'max-h-0 border-t border-transparent opacity-0'
                }`}
            >
                <ul className="flex flex-col gap-4 px-6 py-4">
                    <li><NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>Início</NavLink></li>
                    <li><NavLink to="/locais" className={linkClass} onClick={() => setIsOpen(false)}>Locais</NavLink></li>
                    <li><NavLink to="/sobre" className={linkClass} onClick={() => setIsOpen(false)}>Sobre</NavLink></li>
                    <li>
                        <NavLink
                            to="/cadastrar"
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center justify-center rounded-lg bg-[#005FCC] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 active:scale-95"
                        >
                            Adicionar local
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}