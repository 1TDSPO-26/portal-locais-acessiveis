import { useState, useEffect } from 'react';

type LocalId = string | number;

export function useFavoritos() {

    const [favoritos, setFavoritos] = useState<LocalId[]>(() => {
        const salvos = localStorage.getItem('portalLocaisFavoritos');
        return salvos ? JSON.parse(salvos) : [];
    });

    useEffect(() => {
        localStorage.setItem('portalLocaisFavoritos', JSON.stringify(favoritos)); }, [favoritos]);

        const alterarFavorito = (id: LocalId) => {
            setFavoritos((listaAtual) => {
                if (listaAtual.includes(id)) {
                    return listaAtual.filter((item) => item !== id);
                } else {
                    return [...listaAtual, id];
                }
            });
        };

    const ehFavorito = (id: LocalId) => {
      return favoritos.includes(id);
    };

    return { favoritos, alterarFavorito, ehFavorito };
}