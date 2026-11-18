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

    // 5. Buscar a la clienta por su teléfono; si no existe, registrarla
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

    // 6. Guardar la cita
    const [resultado] = await conexion.query(
      'INSERT INTO citas (id_cliente, id_servicio, id_retiro, fecha, hora, estado, tiempo_total_minutos, valor_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [idCliente, id_servicio, id_retiro || null, fecha, hora, 'pendiente', tiempoTotal, valorTotal]
    );

    // 7. Responder con los datos de la cita
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

module.exports = citaCtrl;
