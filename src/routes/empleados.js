const router   = require('express').Router();
const Empleado = require('../models/Empleado');

// POST - Crear empleado
router.post('/', async (req, res) => {
  try {
    const emp = await Empleado.create(req.body);
    res.status(201).json(emp);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// GET - Todos los empleados
router.get('/', async (req, res) => {
  try {
    const lista = await Empleado.findAll();
    res.json(lista);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET - Un empleado por ID
router.get('/:id', async (req, res) => {
  try {
    const emp = await Empleado.findByPk(req.params.id);
    if (!emp) return res.status(404).json({ error: 'No encontrado' });
    res.json(emp);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;