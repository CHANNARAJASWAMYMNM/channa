const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisan');

// Get all artisans
router.get('/', async (req, res) => {
  try {
    const artisans = await Artisan.find();
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create artisan
router.post('/', async (req, res) => {
  const artisan = new Artisan({
    name: req.body.name,
    village: req.body.village,
    contactInfo: req.body.contactInfo,
    story: req.body.story
  });

  try {
    const newArtisan = await artisan.save();
    res.status(201).json(newArtisan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
