import { useEffect, useState } from "react";

function ServiciosAdmin({ apiUrl, token }) {
  const [servicios, setServicios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Traer los servicios para mostrarlos
  useEffect(() => {
    fetch(`${apiUrl}/servicios`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch(() => setMensaje("No se pudieron cargar los servicios"));
  }, [apiUrl]);

  // Mientras Andi escribe, guardar el número nuevo en la tabla
  const cambiarCampo = (id, campo, valor) => {
    setServicios(
      servicios.map((s) => (s.id_servicio === id ? { ...s, [campo]: valor } : s))
    );
  };

  // Al darle "Guardar", mandar el cambio al backend con el token
  const guardar = async (servicio) => {
    const res = await fetch(`${apiUrl}/servicios/${servicio.id_servicio}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        valor: Number(servicio.valor),
        tiempo_estimado_minutos: Number(servicio.tiempo_estimado_minutos),
      }),
    });
    const data = await res.json();
    setMensaje(res.ok ? `${servicio.nombre}: ${data.message}` : data.message);
  };

  return (
    <div className="tabla-contenedor">
      <h2>Precios y tiempos</h2>
      {mensaje && <p className="saludo">{mensaje}</p>}
      <table className="tabla-citas">
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Valor ($)</th>
            <th>Tiempo (min)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s.id_servicio}>
              <td>{s.nombre}</td>
              <td>
                <input
                  type="number"
                  value={s.valor}
                  onChange={(e) => cambiarCampo(s.id_servicio, "valor", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={s.tiempo_estimado_minutos}
                  onChange={(e) =>
                    cambiarCampo(s.id_servicio, "tiempo_estimado_minutos", e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => guardar(s)}>Guardar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiciosAdmin;