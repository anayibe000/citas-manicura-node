import React, { useState } from "react";

// La clienta recurrente ingresa con su teléfono
function LoginCliente({ apiUrl, onIngresar, onVolver }) {
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${apiUrl}/clientes/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      // Si la encontró, pasar sus datos a App
      onIngresar(data.cliente);
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <section className="formulario">
      <h2>Ingresa con tu teléfono</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Teléfono
          <input
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            maxLength="10"
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit">Ingresar</button>
        <button type="button" className="boton-secundario" onClick={onVolver}>
          Volver
        </button>
      </form>
    </section>
  );
}

export default LoginCliente;