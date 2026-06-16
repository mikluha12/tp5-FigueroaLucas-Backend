const express    = require('express');
const sequelize  = require('./config/database');
require('dotenv').config();

require('./models/Socio');
require('./models/Transaccion');
require('./models/Empleado');
require('./models/Publicacion');

const app = express();
app.use(express.json({ limit: '10mb' }));

app.use('/socios',        require('./routes/socios'));
app.use('/transacciones', require('./routes/transacciones'));
app.use('/empleados',     require('./routes/empleados'));
app.use('/publicaciones', require('./routes/publicaciones'));

const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch(e => console.error('Error al conectar BD:', e));