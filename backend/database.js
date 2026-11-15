const mysql = require('mysql2/promise');

const conexion = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'andi_cardenas'
});

conexion.getConnection()
  .then((c) => {
    console.log('Base de datos conectada');
    c.release();
  })
  .catch((err) => console.error('Error al conectar a la base de datos:', err.message));

module.exports = conexion;