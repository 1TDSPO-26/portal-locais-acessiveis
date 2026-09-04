export default function Cards() {
  return (
    <main className="Cards">
      <h1>Integrantes</h1>
      <div className="cards-container">
        {integrantes.map((pessoa, index) => (
          <div key={index} className="card">
            <h3>{pessoa.nome}</h3>
            {pessoa.rm && <p>{pessoa.rm}</p>}
            
              href={`https://github.com/${pessoa.github}`}
              target="_blank"
              rel="noopener noreferrer"
              @{pessoa.github}
          </div>
        ))}
      </div>
    </main>
  );
}

interface Integrante {
  rm: string;
  nome: string;
  github: string;
}

const integrantes: Integrante[] = [
  { rm: "559202", nome: "Gustavo Borba - Tech Lead", github: "BorbaGustavo" },
  { rm: "568857", nome: "Enzo Negrão - Tech Lead", github: "Enzo-N-Freitas" },
  { rm: "571692", nome: "Ana Mendes - QA", github: "AnaMendes-25" },
  { rm: "", nome: "Oto Mendes - QA", github: "otomendes" },
  { rm: "572325", nome: "Arthur Martins - QA", github: "arthurmartinss" },
  { rm: "570546", nome: "Lucas Abrantes - QA", github: "abrantes1" },
  { rm: "", nome: "Alexandre Prazeres", github: "U-Ale" },
  { rm: "572658", nome: "Alexandre Teixeira", github: "AlexandreTeixeiraS" },
  { rm: "571648", nome: "Allex Oliveira", github: "allex1930" },
  { rm: "", nome: "Canevari", github: "Canevari2" },
  { rm: "", nome: "César Ledres", github: "cesarledres" },
  { rm: "", nome: "Diego Zanon", github: "di-zanon" },
  { rm: "568877", nome: "Enzo Leiva", github: "enzoleiva2008-blip" },
  { rm: "569411", nome: "Felipe Passos", github: "Felipeads12" },
  { rm: "", nome: "Igor Gracetti", github: "Gracetti" },
  { rm: "571244", nome: "Júlia Rodrigues", github: "juliaraalmeida77-ux" },
  { rm: "572213", nome: "Kauã", github: "Kaua056" },
  { rm: "571599", nome: "Kauan Mattos", github: "KauanMattos" },
  { rm: "572369", nome: "KauaznX", github: "KauaznX" },
  { rm: "", nome: "Lucas Almeida", github: "LucasAlmeidaOliveira" },
  { rm: "568216", nome: "Maria Eduarda Escandor", github: "mariabatistaescandor-gif" },
  { rm: "572425", nome: "Maria Eduarda Lima", github: "mariaeduardaalima" },
  { rm: "571365", nome: "Mateus Isaque", github: "Mateus-Isaque" },
  { rm: "573416", nome: "Matheus Leite", github: "matheusleite21" },
  { rm: "571702", nome: "Matheus Nézio", github: "Nezio22" },
  { rm: "570701", nome: "Matheus Ruiz", github: "matheusruiz-07" },
  { rm: "", nome: "Matheus Segura", github: "MatheusSegura" },
  { rm: "573695", nome: "Melissa Fiuza", github: "melissafiuza" },
  { rm: "572704", nome: "Murilo Cruz", github: "MuriloSCruzz" },
  { rm: "572229", nome: "Roberto Park", github: "ropark-tech" },
  { rm: "", nome: "Rocha", github: "Rochagx" },
  { rm: "", nome: "Theo", github: "theo4321" },
  { rm: "569956", nome: "CaioFeixas", github: "caiofeixas" },
];