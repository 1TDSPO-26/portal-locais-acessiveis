interface CheckboxProps {
  label: string;
  error?: boolean;
  disabled?: boolean;
}

function Checkbox({label, error = false, disabled = false,}: CheckboxProps) {
  let className = "checkbox";

  if (error) {
    className += " checkbox--error";
  }

  if (disabled) {
    className += " checkbox--disabled";
  }

  return (
    <label className={className}>
      <input type="checkbox" disabled={disabled}
      />

      <span>{label}</span>
    </label>
  );
}

export default function Checkboxes() {
  return (
    <section className="checkboxes-section">
      <h2>Recursos de acessibilidade</h2>

      <p>Marque apenas o que você consegue confirmar.</p>

      <div className="checkboxes-list">
        <Checkbox label="Entrada com rampa ou acesso em nível" />
        <Checkbox label="Banheiro acessível" />
        <Checkbox label="Vaga reservada" />
        <Checkbox label="Espaço interno para circulação" />
        <Checkbox label="Elevador quando necessário" />
      </div>
    </section>
  );
}