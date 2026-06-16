const router     = require('express').Router();
const Publicacion = require('../models/Publicacion');
const Empleado   = require('../models/Empleado');
const { Op }     = require('sequelize');

// POST - Crear publicación  (body debe incluir empleadoId)
router.post('/', async (req, res) => {
  try {
    const pub = await Publicacion.create(req.body);
    res.status(201).json(pub);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// GET - Todas las publicaciones con datos del empleado
router.get('/', async (req, res) => {
  try {
    const lista = await Publicacion.findAll({
      include: [{ model: Empleado, as: 'empleado' }]
    });
    res.json(lista);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE - Eliminar publicación
router.delete('/:id', async (req, res) => {
  try {
    const pub = await Publicacion.findByPk(req.params.id);
    if (!pub) return res.status(404).json({ error: 'No encontrada' });
    await pub.destroy();
    res.json({ mensaje: 'Publicación eliminada' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT - Modificar publicación
router.put('/:id', async (req, res) => {
  try {
    const pub = await Publicacion.findByPk(req.params.id);
    if (!pub) return res.status(404).json({ error: 'No encontrada' });
    await pub.update(req.body);
    res.json(pub);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// GET - Búsqueda combinada por título (parcial) y/o vigente
// Acepta query params:  /publicaciones/buscar?titulo=hola&vigente=true
router.get('/buscar', async (req, res) => {
  try {
    const where = {};
    if (req.query.titulo)  where.titulo  = { [Op.iLike]: `%${req.query.titulo}%` };
    if (req.query.vigente !== undefined)
      where.vigente = req.query.vigente === 'true';
    const lista = await Publicacion.findAll({
      where,
      include: [{ model: Empleado, as: 'empleado' }]
    });
    res.json(lista);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;