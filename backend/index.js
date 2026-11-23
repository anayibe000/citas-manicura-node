const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('./database');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api/servicios', require('./routes/servicio.routes'));

app.listen(app.get('port'), () => {
  console.log('Servidor escuchando en el puerto ' + app.get('port'));
});
app.use('/api/citas', require('./routes/cita.routes'));

app.use('/api/clientes', require('./routes/cliente.routes'));