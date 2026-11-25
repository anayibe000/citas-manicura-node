const jwt = require('jsonwebtoken');

const SECRETO = process.env.JWT_SECRET || 'secreto_andi_cardenas';

const verificarToken = (req, res, next) => {
  const encabezado = req.headers.authorization;

  if (!encabezado || !encabezado.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Debes iniciar sesión como administradora' });
  }

  const token = encabezado.split(' ')[1];

  try {
    req.admin = jwt.verify(token, SECRETO);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Sesión vencida o no válida, vuelve a iniciar sesión' });
  }
};

module.exports = verificarToken;