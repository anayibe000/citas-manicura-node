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
// Cambiar el valor y el tiempo de un servicio (solo la administradora)
servicioCtrl.actualizarServicio = async (req, res) => {
  const { id } = req.params;
  const { valor, tiempo_estimado_minutos } = req.body;

  if (!valor || !tiempo_estimado_minutos || valor <= 0 || tiempo_estimado_minutos <= 0) {
    return res.status(400).json({ message: 'El valor y el tiempo deben ser números mayores que cero' });
  }

  try {
    const [resultado] = await conexion.query(
      'UPDATE servicios SET valor = ?, tiempo_estimado_minutos = ? WHERE id_servicio = ?',
      [valor, tiempo_estimado_minutos, id]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'El servicio no existe' });
    }
    res.json({ message: 'Servicio actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar el servicio' });
  }
};
module.exports = servicioCtrl;