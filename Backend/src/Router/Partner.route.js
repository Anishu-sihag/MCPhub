import { Router } from 'express';
import Partner from '../Models/Partner.model.js'
const router = Router();

router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  console.log('Incoming Data:', req.body);
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const newPartner = new Partner({ name, email });
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Partner.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    res.json({ message: 'Partner deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
