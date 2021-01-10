const express = require('express');
const router = express.Router();

// IMPORT THE CARD MODEL
const Card = require('../models/Card');

router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.json({ message: err });
  }
});

// CREATE A NEW QUESTION AND ANSWER CARD
router.post('/', async (req, res, next) => {
  const card = new Card({
    question: req.body.question,
    answer: req.body.answer,
    category: req.body.category,
  });
  try {
    const savedCard = await card.save();
    res.status(200).json(savedCard);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
    zx;
  }
});

// GET A SPECIFIC CARD BY CATEGORY
router.get('/:category', async (req, res) => {
  try {
    const card = await Card.find({ category: { $eq: req.params.category } });
    res.json(card);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
