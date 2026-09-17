import { useParams } from "react-router";
import { buscarLocalPorId } from "../../types/locais";
import { useEffect } from "react";

export default function LocalDetalhe() {

  const { id } = useParams<{ id: string }>();
  const local = id ? buscarLocalPorId(id) : undefined;

  if (!local) {
    return <p className="text-sm text-slate-400">[stub] 404 — local não encontrado</p>;
  }

  useEffect(() => {
    document.title = `ACESSO + | ${id}`;
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">

    </main>
  );
}
