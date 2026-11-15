const conexion = require('../database');

const servicioCtrl = {};

// GET: obtener todos los servicios
servicioCtrl.getServicios = async (req, res) => {
  try {
    const [servicios] = await conexion.query(
      'SELECT * FROM servicios ORDER BY es_retiro, nombre'
    );
    res.json(servicios);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los servicios' });
  }
};

module.exports = servicioCtrl;