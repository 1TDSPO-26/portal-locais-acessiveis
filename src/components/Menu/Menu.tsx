import { NavLink } from 'react-router';

export default function Menu() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Início</NavLink>
                </li>
                <li>
                    <NavLink to="/locais">Locais</NavLink>
                </li>
                <li>
                    <NavLink to="/cadastrar">Cadastrar</NavLink>
                </li>
                <li>
                    <NavLink to="/sobre">Sobre</NavLink>
                </li>
            </ul>
        </nav>
    );
}