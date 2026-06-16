const router = require('express').Router();
const Socio  = require('../models/Socio');

// POST - Crear socio
router.post('/', async (req, res) => {
  try {
    const socio = await Socio.create(req.body);
    res.status(201).json(socio);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// GET - Todos los socios
router.get('/', async (req, res) => {
  try {
    const socios = await Socio.findAll();
    res.json(socios);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET - Solo activos
router.get('/activos', async (req, res) => {
  try {
    const socios = await Socio.findAll({ where: { activo: true } });
    res.json(socios);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT - Modificar socio
router.put('/:id', async (req, res) => {
  try {
    const socio = await Socio.findByPk(req.params.id);
    if (!socio) return res.status(404).json({ error: 'No encontrado' });
    await socio.update(req.body);
    res.json(socio);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// DELETE - Eliminar socio
router.delete('/:id', async (req, res) => {
  try {
    const socio = await Socio.findByPk(req.params.id);
    if (!socio) return res.status(404).json({ error: 'No encontrado' });
    await socio.destroy();
    res.json({ mensaje: 'Socio eliminado' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;