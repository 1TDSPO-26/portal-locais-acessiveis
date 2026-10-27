import { useState, useEffect } from "react";

interface Coordenadas {
    latitude: number;
    longitude: number;
}

interface GeolocalizacaoState {
    coordenadas: Coordenadas | null;
    carregando: boolean;
    erro: string | null;
}

export function useGeolocalizacao(): GeolocalizacaoState {
    // Calcula o estado inicial de forma síncrona (antes do primeiro render)
    const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null);
    const [erro, setErro] = useState<string | null>(() => {
        if (typeof window !== "undefined" && !("geolocation" in navigator)) {
            return "Geolocalização não é suportada pelo seu navegador.";
        }
        return null;
    });
    const [carregando, setCarregando] = useState<boolean>(() => {
        if (typeof window !== "undefined" && !("geolocation" in navigator)) {
            return false;
        }
        return true;
    });

    useEffect(() => {
        // Se já der erro na inicialização (navegador sem suporte), não tenta chamar a API
        if (typeof window === "undefined" || !("geolocation" in navigator)) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                setCoordenadas({
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude,
                });
                setCarregando(false);
            },
            (falha) => {
                let mensagem = "Não foi possível obter sua localização.";

                if (falha.code === 1) {
                    mensagem = "Permissão de localização negada. Você pode ativar nas configurações do navegador.";
                } else if (falha.code === 3) {
                    mensagem = "Tempo esgotado ao tentar obter sua localização.";
                }

                setErro(mensagem);
                setCarregando(false);
            },
            {
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }, []);

    return { coordenadas, carregando, erro };
}