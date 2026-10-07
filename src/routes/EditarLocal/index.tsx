import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Local } from "../../types/locais";
import { obterLocalPorId, salvarLocal } from "../../storage/localStorage";
import {
    CATEGORIAS,
    ORDEM_CAMPOS,
    validarLocal,
    type CampoTexto,
    type Categoria,
    type Erros,
} from "./validarLocal";
import ModalConfirmacao from "../../components/ModalConfirmacao/ModalConfirmacao";
import Button from "../../components/Button/Button";

type Recurso = Local["recursos"][number];
type StatusRecurso = Recurso["status"];

const OPCOES_STATUS: { valor: StatusRecurso; rotulo: string }[] = [
    { valor: "disponivel", rotulo: "Disponível" },
    { valor: "indisponivel", rotulo: "Não disponível" },
    { valor: "naoInformado", rotulo: "Não informado" },
    { valor: "naoSeAplica", rotulo: "Não se aplica neste local" },
];

const classeCampo = (temErro: boolean) =>
    `min-h-11 w-full min-w-0 rounded-lg border px-3 py-2 text-base sm:text-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 ${temErro ? "border-red-500" : "border-slate-300"
    }`;

export default function EditarLocal() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const localOriginal = useMemo(() => (id ? obterLocalPorId(id) : undefined), [id]);

    const [nome, setNome] = useState(localOriginal?.nome ?? "");
    const [categoria, setCategoria] = useState<Categoria>(localOriginal?.categoria ?? "Outro");
    const [cidade, setCidade] = useState(localOriginal?.cidade ?? "");
    const [endereco, setEndereco] = useState(localOriginal?.endereco ?? "");
    const [contato, setContato] = useState(localOriginal?.contato ?? "");
    const [descricao, setDescricao] = useState(localOriginal?.descricao ?? "");
    const [recursos, setRecursos] = useState<Recurso[]>(localOriginal?.recursos ?? []);

    const [erros, setErros] = useState<Erros>({});
    const [erroSalvar, setErroSalvar] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    const camposRef = useRef<Partial<Record<CampoTexto, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>>({});

    useEffect(() => {
        document.title = localOriginal
            ? `Editar ${localOriginal.nome} | ACESSO+`
            : "Local não encontrado | ACESSO+";
    }, [localOriginal]);

    if (!localOriginal || !id) {
        return (
            <main className="mx-auto flex min-h-[50vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
                <h1 className="text-xl font-semibold text-gray-900">Local não encontrado</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Não é possível editar um local que não existe ou foi removido.
                </p>
                <Link
                    to="/locais"
                    className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    ← Voltar para locais
                </Link>
            </main>
        );
    }

    function alterarStatusRecurso(recursoId: string, status: StatusRecurso) {
        setRecursos((atuais) =>
            atuais.map((recurso) => {
                if (recurso.id !== recursoId) return recurso;
                const rotuloStatus = OPCOES_STATUS.find((opcao) => opcao.valor === status)?.rotulo ?? "";
                return { ...recurso, status, detalhe: rotuloStatus };
            })
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErroSalvar("");

        const novosErros = validarLocal({ nome, categoria, cidade, endereco, contato, descricao });
        setErros(novosErros);

        const primeiroErro = ORDEM_CAMPOS.find((campo) => novosErros[campo]);
        if (primeiroErro) {
            camposRef.current[primeiroErro]?.focus();
            return;
        }

        setModalAberto(true);
    }

    function confirmarEdicao() {
        if (!localOriginal) return;

        try {
            salvarLocal({
                ...localOriginal,
                nome: nome.trim(),
                categoria,
                cidade: cidade.trim(),
                endereco: endereco.trim(),
                contato: contato.trim() || undefined,
                descricao: descricao.trim(),
                recursos,
            });
            setModalAberto(false);
            navigate(`/locais/${localOriginal.id}`, {
                state: { mensagem: "Alterações salvas com sucesso." },
            });
        } catch {
            setModalAberto(false);
            setErroSalvar("Não foi possível salvar as alterações. Tente novamente.");
        }
    }

    function propsErro(campo: CampoTexto) {
        return {
            "aria-invalid": !!erros[campo],
            "aria-describedby": erros[campo] ? `${campo}-erro` : undefined,
        };
    }

    function mensagemErro(campo: CampoTexto) {
        return (
            erros[campo] && (
                <p id={`${campo}-erro`} role="alert" className="text-sm text-red-600">
                    {erros[campo]}
                </p>
            )
        );
    }

    return (
        <main className="mx-auto max-w-4xl px-4 py-10">
            <Link to={`/locais/${id}`} className="mb-4 inline-block text-sm text-blue-600 hover:underline">
                ← Voltar para o local
            </Link>

            <h1 className="text-3xl font-bold text-slate-900">Editar local</h1>
            <p className="mt-2 text-sm text-slate-500">
                Atualize as informações de <strong>{localOriginal.nome}</strong>. Campos marcados com * são obrigatórios.
            </p>

            {erroSalvar && (
                <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                    {erroSalvar}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="text-sm font-semibold text-slate-800">
                        Nome do local *
                    </label>
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        ref={(el) => { camposRef.current.nome = el; }}
                        className={classeCampo(!!erros.nome)}
                        {...propsErro("nome")}
                    />
                    {mensagemErro("nome")}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="categoria" className="text-sm font-semibold text-slate-800">
                        Categoria *
                    </label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value as Categoria)}
                        ref={(el) => { camposRef.current.categoria = el; }}
                        className={classeCampo(!!erros.categoria)}
                        {...propsErro("categoria")}
                    >
                        {CATEGORIAS.map((opcao) => (
                            <option key={opcao} value={opcao}>
                                {opcao}
                            </option>
                        ))}
                    </select>
                    {mensagemErro("categoria")}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="cidade" className="text-sm font-semibold text-slate-800">
                            Cidade *
                        </label>
                        <input
                            id="cidade"
                            type="text"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            ref={(el) => { camposRef.current.cidade = el; }}
                            className={classeCampo(!!erros.cidade)}
                            {...propsErro("cidade")}
                        />
                        {mensagemErro("cidade")}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="endereco" className="text-sm font-semibold text-slate-800">
                            Endereço *
                        </label>
                        <input
                            id="endereco"
                            type="text"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            ref={(el) => { camposRef.current.endereco = el; }}
                            className={classeCampo(!!erros.endereco)}
                            {...propsErro("endereco")}
                        />
                        {mensagemErro("endereco")}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="contato" className="text-sm font-semibold text-slate-800">
                        Telefone de contato (opcional)
                    </label>
                    <input
                        id="contato"
                        type="tel"
                        inputMode="tel"
                        placeholder="(11) 3333-4444"
                        value={contato}
                        onChange={(e) => setContato(e.target.value)}
                        ref={(el) => { camposRef.current.contato = el; }}
                        className={classeCampo(!!erros.contato)}
                        {...propsErro("contato")}
                    />
                    {mensagemErro("contato")}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao" className="text-sm font-semibold text-slate-800">
                        Descrição *
                    </label>
                    <textarea
                        id="descricao"
                        rows={4}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        ref={(el) => { camposRef.current.descricao = el; }}
                        className={`${classeCampo(!!erros.descricao)} resize-none`}
                        {...propsErro("descricao")}
                    />
                    {mensagemErro("descricao")}
                </div>

                <fieldset className="flex flex-col gap-4">
                    <legend className="text-base font-semibold text-slate-900">Recursos de acessibilidade</legend>
                    <p className="-mt-2 text-sm text-slate-500">
                        Se não tiver certeza sobre um recurso, escolha “Não informado”.
                    </p>
                    {recursos.map((recurso) => (
                        <div key={recurso.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <label htmlFor={`recurso-${recurso.id}`} className="text-sm text-slate-700">
                                {recurso.rotulo}
                            </label>
                            <select
                                id={`recurso-${recurso.id}`}
                                value={recurso.status}
                                onChange={(e) => alterarStatusRecurso(recurso.id, e.target.value as StatusRecurso)}
                                className={`${classeCampo(false)} sm:w-64`}
                            >
                                {OPCOES_STATUS.map((opcao) => (
                                    <option key={opcao.valor} value={opcao.valor}>
                                        {opcao.rotulo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </fieldset>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <Button to={`/locais/${id}`} variant="secondary" className="px-5">
                        Cancelar
                    </Button>
                    <Button type="submit" className="px-5 font-semibold">
                        Salvar alterações
                    </Button>
                </div>
            </form>

            <ModalConfirmacao
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                onConfirm={confirmarEdicao}
                title="Salvar alterações?"
                message="Revise os dados antes de continuar. As informações do local serão atualizadas."
            />
        </main>
    );
}