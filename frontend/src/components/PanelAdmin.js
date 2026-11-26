import { useEffect, useState } from "react";

function PanelAdmin({ apiUrl, token }) {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [citaAEliminar, setCitaAEliminar] = useState(null); // la cita que se va a borrar

  // Al abrir el panel, pedir las citas mostrando el token
  useEffect(() => {
    fetch(`${apiUrl}/citas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setCitas(data);
      })
      .catch((err) => setError(err.message));
  }, [apiUrl, token]);

  // Cambiar el estado de una cita (pendiente, confirmada o cancelada)
  const cambiarEstado = async (id, estado) => {
    const res = await fetch(`${apiUrl}/citas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ estado }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMensaje(data.message);
      return;
    }
    setCitas(citas.map((c) => (c.id_cita === id ? { ...c, estado } : c)));
    setMensaje("Estado actualizado");
  };

  // Eliminar la cita escogida, después de que Andi confirma
  const eliminar = async () => {
    const id = citaAEliminar.id_cita;
    setCitaAEliminar(null);
    const res = await fetch(`${apiUrl}/citas/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      setMensaje(data.message);
      return;
    }
    setCitas(citas.filter((c) => c.id_cita !== id));
    setMensaje("Cita eliminada");
  };

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="tabla-contenedor">
      <h2>Citas agendadas</h2>
      {mensaje && <p className="saludo">{mensaje}</p>}

      {/* Ventanita para confirmar antes de eliminar */}
      {citaAEliminar && (
        <div className="fondo-modal">
          <div className="modal">
            <h3>¿Eliminar esta cita?</h3>
            <p>
              {citaAEliminar.clienta} – {citaAEliminar.servicio}
              <br />
              {citaAEliminar.fecha} a las {citaAEliminar.hora.slice(0, 5)}
            </p>
            <div className="botones-modal">
              <button onClick={eliminar}>Sí, eliminar</button>
              <button className="boton-secundario" onClick={() => setCitaAEliminar(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="tabla-citas">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Clienta</th>
            <th>Teléfono</th>
            <th>Servicio</th>
            <th>Valor</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id_cita}>
              <td>{cita.fecha}</td>
              <td>{cita.hora.slice(0, 5)}</td>
              <td>{cita.clienta}</td>
              <td>{cita.telefono}</td>
              <td>{cita.servicio}</td>
              <td>
                {cita.valor_total
                  ? "$" + Number(cita.valor_total).toLocaleString("es-CO")
                  : "—"}
              </td>
              <td>
                <select
                  value={cita.estado}
                  onChange={(e) => cambiarEstado(cita.id_cita, e.target.value)}
                >
                  <option value="pendiente">pendiente</option>
                  <option value="confirmada">confirmada</option>
                  <option value="cancelada">cancelada</option>
                </select>
              </td>
              <td>
                <button className="boton-secundario" onClick={() => setCitaAEliminar(cita)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PanelAdmin;