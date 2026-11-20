const conexion = require('../database');

const citaCtrl = {};

// POST: crear una cita
citaCtrl.crearCita = async (req, res) => {
  const { nombre, apellido, telefono, id_servicio, id_retiro, fecha, hora } = req.body;

  // 1. Revisar que lleguen los datos obligatorios
  if (!nombre || !apellido || !telefono || !id_servicio || !fecha || !hora) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  // 2. Revisar que el teléfono tenga 10 números
  if (!/^[0-9]{10}$/.test(telefono)) {
    return res.status(400).json({ message: 'El teléfono debe tener 10 números' });
  }

  // 3. Revisar que la fecha no sea pasada
  const hoy = new Date().toLocaleDateString('en-CA');
  if (fecha < hoy) {
    return res.status(400).json({ message: 'La fecha no puede ser anterior a hoy' });
  }

  try {
    // 4. Buscar el servicio
    const [servicios] = await conexion.query(
      'SELECT * FROM servicios WHERE id_servicio = ? AND es_retiro = 0',
      [id_servicio]
    );
    if (servicios.length === 0) {
      return res.status(404).json({ message: 'El servicio no existe' });
    }
    const servicio = servicios[0];

    let tiempoTotal = servicio.tiempo_estimado_minutos;
    let valorTotal = Number(servicio.valor);

    // Si pidió retiro, sumar su tiempo y su valor
    if (id_retiro) {
      const [retiros] = await conexion.query(
        'SELECT * FROM servicios WHERE id_servicio = ? AND es_retiro = 1',
        [id_retiro]
      );
      if (retiros.length === 0) {
        return res.status(404).json({ message: 'El retiro no existe' });
      }
      tiempoTotal += retiros[0].tiempo_estimado_minutos;
      valorTotal += Number(retiros[0].valor);
    }

    // 5. NUEVO: revisar que el horario no se cruce con otra cita
    // Se busca una cita del mismo día (que no esté cancelada) que empiece
    // antes de que termine la nueva y termine después de que empiece la nueva.
    const [cruces] = await conexion.query(
      `SELECT c.id_cita
       FROM citas c
       JOIN servicios s ON c.id_servicio = s.id_servicio
       WHERE c.fecha = ?
         AND c.estado <> 'cancelada'
         AND c.hora < ADDTIME(?, SEC_TO_TIME(? * 60))
         AND ADDTIME(c.hora, SEC_TO_TIME(COALESCE(c.tiempo_total_minutos, s.tiempo_estimado_minutos) * 60)) > ?`,
      [fecha, hora, tiempoTotal, hora]
    );
    if (cruces.length > 0) {
      return res.status(409).json({ message: 'Ese horario ya está ocupado. Por favor escoge otra hora' });
    }

    // 6. Buscar a la clienta por su teléfono; si no existe, registrarla
    const [clientes] = await conexion.query(
      'SELECT id_cliente FROM clientes WHERE telefono = ?',
      [telefono]
    );
    let idCliente;
    if (clientes.length > 0) {
      idCliente = clientes[0].id_cliente;
    } else {
      const [nueva] = await conexion.query(
        'INSERT INTO clientes (nombre, apellido, telefono) VALUES (?, ?, ?)',
        [nombre, apellido, telefono]
      );
      idCliente = nueva.insertId;
    }

    // 7. Guardar la cita
    const [resultado] = await conexion.query(
      'INSERT INTO citas (id_cliente, id_servicio, id_retiro, fecha, hora, estado, tiempo_total_minutos, valor_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [idCliente, id_servicio, id_retiro || null, fecha, hora, 'pendiente', tiempoTotal, valorTotal]
    );

    // 8. Responder con los datos de la cita
    res.status(201).json({
      message: 'Cita agendada',
      cita: {
        id_cita: resultado.insertId,
        clienta: nombre + ' ' + apellido,
        servicio: servicio.nombre,
        fecha,
        hora,
        tiempo_total_minutos: tiempoTotal,
        valor_total: valorTotal,
        estado: 'pendiente'
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al guardar la cita' });
  }
};

// GET: ver todas las citas, con el nombre de la clienta y del servicio
citaCtrl.getCitas = async (req, res) => {
  try {
    const [citas] = await conexion.query(
      `SELECT c.id_cita, c.fecha, c.hora, c.estado,
              c.tiempo_total_minutos, c.valor_total,
              CONCAT(cl.nombre, ' ', cl.apellido) AS clienta,
              cl.telefono,
              s.nombre AS servicio
       FROM citas c
       JOIN clientes cl ON c.id_cliente = cl.id_cliente
       JOIN servicios s ON c.id_servicio = s.id_servicio
       ORDER BY c.fecha, c.hora`
    );
    res.json(citas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener las citas' });
  }
};

// PUT: cambiar el estado de una cita
citaCtrl.cambiarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['pendiente', 'confirmada', 'cancelada'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ message: 'El estado debe ser pendiente, confirmada o cancelada' });
  }

  try {
    const [resultado] = await conexion.query(
      'UPDATE citas SET estado = ? WHERE id_cita = ?',
      [estado, id]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'La cita no existe' });
    }
    res.json({ message: 'Estado actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar la cita' });
  }
};

// DELETE: eliminar una cita
citaCtrl.eliminarCita = async (req, res) => {
  const { id } = req.params;

  try {
    const [resultado] = await conexion.query(
      'DELETE FROM citas WHERE id_cita = ?',
      [id]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'La cita no existe' });
    }
    res.json({ message: 'Cita eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar la cita' });
  }
};
module.exports = citaCtrl;