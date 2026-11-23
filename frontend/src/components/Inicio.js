import React from "react";

// Pantalla de inicio: la clienta escoge si es nueva o recurrente
function Inicio({ onNueva, onRecurrente }) {
  return (
    <section className="inicio">
      <h2>¿Cómo quieres agendar tu cita?</h2>
      <div className="botones-inicio">
        <button onClick={onNueva}>Soy nueva</button>
        <button onClick={onRecurrente}>Ya soy clienta</button>
      </div>
    </section>
  );
}

export default Inicio;