import React, { useState } from "react";

// Formulario para agendar la cita.
// Si recibe una clienta (recurrente), usa sus datos y no se los vuelve a pedir.
function CitaForm({ servicios, retiros, apiUrl, onCitaAgendada, clienta }) {
  const [form, setForm] = useState({
    nombre: clienta ? clienta.nombre : "",
    apellido: clienta ? clienta.apellido : "",
    telefono: clienta ? clienta.telefono : "",
    id_servicio: "",
    id_retiro: "",
    fecha: "",
    hora: ""
  });
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Guardar lo que la clienta escribe en cada campo
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar la cita al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEnviando(true);

    try {
      const res = await fetch(`${apiUrl}/citas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          id_servicio: Number(form.id_servicio),
          id_retiro: form.id_retiro ? Number(form.id_retiro) : null
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "No se pudo agendar la cita");
        return;
      }

      onCitaAgendada(data.cita);
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setEnviando(false);
    }
  };

  const hoy = new Date().toLocaleDateString("en-CA");

  return (
    <section className="formulario">
      <h2>Agenda tu cita</h2>

      <form onSubmit={handleSubmit}>
        {/* Los datos personales solo se piden a la clienta nueva */}
        {!clienta && (
          <>
            <label>
              Nombre
              <input name="nombre" value={form.nombre} onChange={handleChange} required />
            </label>

            <label>
              Apellido
              <input name="apellido" value={form.apellido} onChange={handleChange} required />
            </label>

            <label>
              Teléfono
              <input name="telefono" value={form.telefono} onChange={handleChange} maxLength="10" required />
            </label>
          </>
        )}

        <label>
          Servicio
          <select name="id_servicio" value={form.id_servicio} onChange={handleChange} required>
            <option value="">Escoge un servicio</option>
            {servicios.map((s) => (
              <option key={s.id_servicio} value={s.id_servicio}>
                {s.nombre} – {s.tiempo_estimado_minutos} min
              </option>
            ))}
          </select>
        </label>

        <label>
          Retiro (opcional)
          <select name="id_retiro" value={form.id_retiro} onChange={handleChange}>
            <option value="">No necesito retiro</option>
            {retiros.map((r) => (
              <option key={r.id_servicio} value={r.id_servicio}>
                {r.nombre} – {r.tiempo_estimado_minutos} min
              </option>
            ))}
          </select>
        </label>

        <label>
          Fecha
          <input type="date" name="fecha" min={hoy} value={form.fecha} onChange={handleChange} required />
        </label>

        <label>
          Hora
          <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={enviando}>
          {enviando ? "Agendando..." : "Agendar cita"}
        </button>
      </form>
    </section>
  );
}

export default CitaForm;