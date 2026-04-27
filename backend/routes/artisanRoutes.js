const express = require('express');
const router = express.Router();
const { artisans } = require('../dataStore');

// Get all artisans
router.get('/', (req, res) => {
  try {
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create artisan
router.post('/', (req, res) => {
  try {
    const newArtisan = {
      _id: Date.now().toString(),
      name: req.body.name,
      village: req.body.village,
      contactInfo: req.body.contactInfo,
      story: req.body.story,
      createdAt: new Date().toISOString()
    };

    artisans.push(newArtisan);
    res.status(201).json(newArtisan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
