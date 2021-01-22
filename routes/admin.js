const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const middleware = require('../middleware');
const Card = require('../models/Card');

router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.render('admin/cards', {
      title: 'Test Bank',
      cardBox: cards,
      question: cards.question,
      category: cards.category,
      answer: cards.answer,
    });
  } catch (err) {
    res.json({ message: err });
  }
});
// Edit Card
router.get('/edit-card', (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const cardId = req.params.cardId;
  Card.findById(cardId, (card) => {
    if (!card) {
      return res.redirect('/');
    }
    res.render('admin/edit-card', {
      title: 'Edit Card',
      editing: editMode,
      card: card,
    });
  });
});

module.exports = router;
