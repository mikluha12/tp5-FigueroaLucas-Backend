const router      = require('express').Router();
const Transaccion = require('../models/Transaccion');
const { Op }      = require('sequelize');

// POST - Crear transacción
router.post('/', async (req, res) => {
  try {
    const t = await Transaccion.create(req.body);
    res.status(201).json(t);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// GET - Todas las transacciones
router.get('/', async (req, res) => {
  try {
    const lista = await Transaccion.findAll();
    res.json(lista);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET - Historial por email  →  /transacciones/cliente/usuario@mail.com
router.get('/cliente/:email', async (req, res) => {
  try {
    const lista = await Transaccion.findAll({
      where: { emailCliente: req.params.email }
    });
    res.json(lista);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET - Por idioma origen y destino  →  /transacciones/idiomas/es/en
router.get('/idiomas/:origen/:destino', async (req, res) => {
  try {
    const lista = await Transaccion.findAll({
      where: {
        idiomaOrigen:  req.params.origen,
        idiomaDestino: req.params.destino,
      }
    });
    res.json(lista);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;