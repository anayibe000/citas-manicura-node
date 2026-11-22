import React from "react";

// Muestra los datos de la cita que respondió el backend
function Confirmacion({ cita, onNuevaCita }) {
  return (
    <section className="confirmacion">
      <h2>¡Tu cita quedó agendada!</h2>
      <p><strong>Clienta:</strong> {cita.clienta}</p>
      <p><strong>Servicio:</strong> {cita.servicio}</p>
      <p><strong>Fecha:</strong> {cita.fecha}</p>
      <p><strong>Hora:</strong> {cita.hora}</p>
      <p><strong>Tiempo total:</strong> {cita.tiempo_total_minutos} min</p>
      <p><strong>Valor total:</strong> ${Number(cita.valor_total).toLocaleString("es-CO")}</p>
      <p><strong>Estado:</strong> {cita.estado}</p>
      <button onClick={onNuevaCita}>Agendar otra cita</button>
    </section>
  );
}

export default Confirmacion;