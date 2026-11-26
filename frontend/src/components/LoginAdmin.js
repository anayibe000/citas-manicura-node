import { useState } from "react";

function LoginAdmin({ apiUrl, onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      onLogin(data.token);
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2>Ingreso de la administradora</h2>

      <label>Usuario</label>
      <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required />

      <label>Contraseña</label>
      <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />

      {error && <p className="error">{error}</p>}

      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginAdmin;