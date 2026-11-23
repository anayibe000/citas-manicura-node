import React, { useState, useEffect } from "react";
import Inicio from "./components/Inicio";
import LoginCliente from "./components/LoginCliente";
import ServicioList from "./components/ServicioList";
import CitaForm from "./components/CitaForm";
import Confirmacion from "./components/Confirmacion";
import "./App.css";

const API_URL = "http://localhost:3000/api";

function App() {
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState("");
  const [pantalla, setPantalla] = useState("inicio"); // inicio, nueva, login o recurrente
  const [clienta, setClienta] = useState(null);
  const [citaConfirmada, setCitaConfirmada] = useState(null);

  // Al abrir la página, pedirle los servicios al backend
  useEffect(() => {
    fetch(`${API_URL}/servicios`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch(() => setError("No se pudieron cargar los servicios"));
  }, []);

  const serviciosNormales = servicios.filter((s) => s.es_retiro === 0);
  const retiros = servicios.filter((s) => s.es_retiro === 1);

  // Volver al inicio y olvidar a la clienta
  const volverAlInicio = () => {
    setClienta(null);
    setCitaConfirmada(null);
    setPantalla("inicio");
  };

  return (
    <div className="app">
      <header className="encabezado">
        <h1>Andi Cárdenas</h1>
        <p className="subtitulo">Amor y cuidado por tus uñas</p>
      </header>

      {error && <p className="error">{error}</p>}

      {citaConfirmada ? (
        <Confirmacion cita={citaConfirmada} onNuevaCita={() => setCitaConfirmada(null)} />
      ) : (
        <>
          {pantalla === "inicio" && (
            <Inicio
              onNueva={() => setPantalla("nueva")}
              onRecurrente={() => setPantalla("login")}
            />
          )}

          {pantalla === "nueva" && (
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

          {pantalla === "login" && (
            <LoginCliente
              apiUrl={API_URL}
              onIngresar={(datos) => {
                setClienta(datos);
                setPantalla("recurrente");
              }}
              onVolver={volverAlInicio}
            />
          )}

          {pantalla === "recurrente" && clienta && (
            <>
              <p className="saludo">Hola, {clienta.nombre} 💅</p>
              <CitaForm
                servicios={serviciosNormales}
                retiros={retiros}
                apiUrl={API_URL}
                onCitaAgendada={setCitaConfirmada}
                clienta={clienta}
              />
            </>
          )}

          {pantalla !== "inicio" && pantalla !== "login" && (
            <div className="acciones">
              <button className="boton-secundario" onClick={volverAlInicio}>
                {clienta ? "Cerrar sesión" : "Volver al inicio"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
