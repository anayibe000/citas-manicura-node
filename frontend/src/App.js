import React, { useState, useEffect } from "react";
import ServicioList from "./components/ServicioList";
import CitaForm from "./components/CitaForm";
import Confirmacion from "./components/Confirmacion";
import "./App.css";

const API_URL = "http://localhost:3000/api";

function App() {
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState("");
  const [citaConfirmada, setCitaConfirmada] = useState(null);

  // Al abrir la página, pedirle los servicios al backend
  useEffect(() => {
    fetch(`${API_URL}/servicios`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch(() => setError("No se pudieron cargar los servicios"));
  }, []);

  // Separar los servicios y los retiros
  const serviciosNormales = servicios.filter((s) => s.es_retiro === 0);
  const retiros = servicios.filter((s) => s.es_retiro === 1);

  return (
    <div className="app">
      <header className="encabezado">
        <h1>Andi Cárdenas</h1>
        <p className="subtitulo">Amor y cuidado por tus uñas</p>
      </header>

      {error && <p className="error">{error}</p>}

      {citaConfirmada ? (
        <Confirmacion
          cita={citaConfirmada}
          onNuevaCita={() => setCitaConfirmada(null)}
        />
      ) : (
        <>
          <ServicioList servicios={serviciosNormales} />
          <CitaForm
            servicios={serviciosNormales}
            retiros={retiros}
            apiUrl={API_URL}
            onCitaAgendada={setCitaConfirmada}
          />
        </>
      )}
    </div>
  );
}

export default App;
