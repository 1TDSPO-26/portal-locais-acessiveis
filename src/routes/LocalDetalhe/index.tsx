import { useParams } from "react-router";
import { buscarLocalPorId } from "../../types/locais";
import { ItemAcessibilidade } from "../../components/ItemAcessibilidade/ItemAcessibilidade";
import { Tag } from "../../components/Tag/Tag";

export default function LocalDetalhe() {
  const { id } = useParams<{ id: string }>();
  const local = id ? buscarLocalPorId(id) : undefined;

  if (!local) {
    return <p className="text-sm text-slate-400">[stub] 404 — local não encontrado</p>;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <p className="text-sm text-slate-400">[stub] Detalhes de {local.nome}</p>
      <Tag categoria={local.categoria} />
      <ul>
        {local.recursos.map((recurso) => (
          <ItemAcessibilidade key={recurso.id} recurso={recurso} />
        ))}
      </ul>
    </main>
  );
}
