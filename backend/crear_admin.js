// Programa para crear la cuenta de la administradora.
// Uso: node crear_admin.js usuario contraseña
const bcrypt = require('bcryptjs');
const conexion = require('./database');

const [usuario, contrasena] = process.argv.slice(2);

if (!usuario || !contrasena) {
  console.log('Uso: node crear_admin.js usuario contraseña');
  process.exit(1);
}

(async () => {
  try {
    const hash = await bcrypt.hash(contrasena, 10);
    await conexion.query(
      'INSERT INTO administradores (usuario, contrasena) VALUES (?, ?)',
      [usuario, hash]
    );
    console.log('Administradora creada: ' + usuario);
  } catch (err) {
    console.error('No se pudo crear:', err.message);
  } finally {
    process.exit(0);
  }
})();