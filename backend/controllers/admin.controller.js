const conexion = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRETO = process.env.JWT_SECRET || 'secreto_andi_cardenas';

const adminCtrl = {};

// POST: la administradora inicia sesión con usuario y contraseña
adminCtrl.login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'Escribe el usuario y la contraseña' });
  }

  try {
    // Buscar a la administradora por su usuario
    const [admins] = await conexion.query(
      'SELECT * FROM administradores WHERE usuario = ?',
      [usuario]
    );
    if (admins.length === 0) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Comparar la contraseña escrita con la cifrada
    const coincide = await bcrypt.compare(contrasena, admins[0].contrasena);
    if (!coincide) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Crear el token, el "pase" que dura 8 horas
    const token = jwt.sign(
      { id_admin: admins[0].id_admin, usuario: admins[0].usuario },
      SECRETO,
      { expiresIn: '8h' }
    );

    res.json({ message: 'Bienvenida', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = adminCtrl;