import React from "react";

// Componente que muestra la lista de servicios
function ServicioList({ servicios }) {
  if (servicios.length === 0) {
    return <p>No hay servicios para mostrar.</p>;
  }

  return (
    <section>
      <h2>Nuestros servicios</h2>
      <div className="lista-servicios">
        {servicios.map((servicio) => (
          <div className="tarjeta" key={servicio.id_servicio}>
            <h3>{servicio.nombre}</h3>
            <p>{servicio.descripcion}</p>
            <p><strong>Tiempo:</strong> {servicio.tiempo_estimado_minutos} min</p>
            <p><strong>Valor:</strong> ${Number(servicio.valor).toLocaleString("es-CO")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicioList;