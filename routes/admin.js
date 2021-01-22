const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

router.get('/cards', async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.render('admin/cards', {
      title: 'Test Bank',
      cardBox: cards,
      question: cards.question,
      category: cards.category,
      answer: cards.answer,
    });
    res.send(cards);
  } catch (err) {
    res.json({ message: err });
  }
});

// Edit Card
router.get('/edit-card/:cardId', async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  } else {
    try {
      const card = await Card.findById(req.params.cardId);
      res.render('admin/edit-card', {
        title: 'Edit Card',
        editing: editMode,
        card: card,
      });
    } catch (err) {
      res.render({ message: err });
    }
  }
});

// SAVE EDITED CARD

router.post('/edit-card/:cardId', async (req, res) => {
  try {
    const updatedCard = await Card.findOneAndUpdate(
      req.params.cardId,
      {
        question: req.body.question,
        answer: req.body.answer,
        category: req.body.category,
      },
      { new: true }
    );
    res.redirect('/admin/cards');
  } catch (err) {
    res.json({ message: err });
  }
});

// GET ADD PRODUCT FORM
router.get('/add-card', (req, res, next) => {
  res.render('admin/edit-card', {
    title: 'Add Card',
    editing: false,
  });
});

// ADD A NEW CARD
router.post('/add-card', async (req, res, next) => {
  const card = new Card({
    question: req.body.question,
    answer: req.body.answer,
    category: req.body.category,
  });
  try {
    const savedCard = await card.save();
    res.redirect('/admin/cards');
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// DELETE A CARD
router.post('/cards/:cardId', async (req, res, next) => {
  try {
    const removeCard = await Card.findByIdAndDelete({ _id: req.params.cardId });
    res.redirect('/admin/cards');
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
