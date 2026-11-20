import React, { useState, useEffect } from "react";
import ServicioList from "./components/ServicioList";
import "./App.css";

const API_URL = "http://localhost:3000/api";

function App() {
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState("");

  // Al abrir la página, pedirle los servicios al backend
  useEffect(() => {
    fetch(`${API_URL}/servicios`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch(() => setError("No se pudieron cargar los servicios"));
  }, []);

  // Mostrar solo los servicios, sin los retiros
  const serviciosNormales = servicios.filter((s) => s.es_retiro === 0);

  return (
    <div className="app">
      <header className="encabezado">
        <h1>Andi Cárdenas</h1>
        <p className="subtitulo">Amor y cuidado por tus uñas</p>
      </header>

      {error && <p className="error">{error}</p>}

      <ServicioList servicios={serviciosNormales} />
    </div>
  );
}

export default App;