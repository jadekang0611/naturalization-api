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

// GET A SPECIFIC CARD BY ID
router.get('/:cardId', async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    console.log('filtered!');
    res.json(card);
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
router.get('/category/:category', async (req, res) => {
  try {
    const card = await Card.find({ category: { $eq: req.params.category } });
    res.json(card);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE A CARD
router.patch('/:cardId', async (req, res) => {
  try {
    const updatedCard = await Card.updateOne(
      { _id: req.params.cardId },
      {
        $set: {
          question: req.body.question,
          answer: req.body.answer,
          category: req.body.category,
        },
      }
    );
    res.json({ message: 'Card updated!', updatedCard });
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE A CARD
router.delete('/:cardId', async (req, res) => {
  try {
    const removedCard = await Card.deleteOne({ _id: req.params.cardId });
    res.json({ message: 'Card successfully deleted!', removedCard });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
