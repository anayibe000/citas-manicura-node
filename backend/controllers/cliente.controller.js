const conexion = require('../database');

const clienteCtrl = {};

// POST: la clienta recurrente ingresa con su teléfono
clienteCtrl.login = async (req, res) => {
  const { telefono } = req.body;

  // Revisar que el teléfono tenga 10 números
  if (!/^[0-9]{10}$/.test(telefono || '')) {
    return res.status(400).json({ message: 'El teléfono debe tener 10 números' });
  }

  try {
    // Buscar a la clienta por su teléfono
    const [clientes] = await conexion.query(
      'SELECT id_cliente, nombre, apellido, telefono FROM clientes WHERE telefono = ?',
      [telefono]
    );

    if (clientes.length === 0) {
      return res.status(404).json({ message: 'No encontramos ese número. Si es tu primera vez, agenda como clienta nueva' });
    }

    res.json({ message: 'Bienvenida', cliente: clientes[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al buscar la clienta' });
  }
};

module.exports = clienteCtrl;