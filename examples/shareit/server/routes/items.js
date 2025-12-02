const { Router } = require('express');
const router = Router();

const { listItems, borrowItem, returnItem } = require('../domain/items');
const itemsRepo = require('../adapters/itemsRepo');

router.get('/', async (req, res) => {
  try {
    const items = await itemsRepo.findAll();
    const normalized = listItems(items);
    res.json(normalized);
  } catch (err) {
    console.error('GET /api/items failed:', err);
    res.status(500).json({ error: 'Failed to load items' });
  }
});

router.post('/:id/borrow', async (req, res) => {
  try {
    const item = await borrowItem(itemsRepo, req.params.id);
    res.json(item);
  } catch (err) {
    console.error('POST /api/items/:id/borrow failed:', err && err.message ? err.message : err);
    if (err && err.status) return res.status(err.status).json({ error: err.message });
    res.status(500).json({ error: 'Failed to borrow item' });
  }
});

router.post('/:id/return', async (req, res) => {
  try {
    const item = await returnItem(itemsRepo, req.params.id);
    res.json(item);
  } catch (err) {
    console.error('POST /api/items/:id/return failed:', err && err.message ? err.message : err);
    if (err && err.status) return res.status(err.status).json({ error: err.message });
    res.status(500).json({ error: 'Failed to return item' });
  }
});

module.exports = router;