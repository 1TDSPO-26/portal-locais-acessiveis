export default function Cadastro() {
  return (
    <main>
      <h1>Cadastro</h1>

      <form>
        <label htmlFor="nomeLocal">Nome do local</label>
        <input
          type="text"
          id="nomeLocal"
          name="nomeLocal"
          required
        />

        <label htmlFor="endereco">Endereço</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          required
        />

        <label htmlFor="tipoLocal">Tipo de local</label>
        <select
          id="tipoLocal"
          name="tipoLocal"
          required
        >
          <option value="">Selecione</option>
          <option value="restaurante">Restaurante</option>
          <option value="hospital">Hospital</option>
          <option value="escola">Escola</option>
          <option value="outro">Outro</option>
        </select>

        <fieldset>
          <legend>Acessibilidade</legend>

          <label>
            <input
              type="radio"
              name="acessibilidade"
              value="rampa"
              required
              aria-label="Rampa de acesso"
            />
            Rampa de acesso
          </label>

          <label>
            <input
              type="radio"
              name="acessibilidade"
              value="banheiro"
              aria-label="Banheiro acessível"
            />
            Banheiro acessível
          </label>
        </fieldset>

        <label htmlFor="observacoes">Observações</label>
        <textarea
          id="observacoes"
          name="observacoes"
          rows={4}
        />

        <button type="submit">
          Enviar
        </button>
      </form>
    </main>
  );
}