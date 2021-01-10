const mongoose = require('mongoose');

// Create my schema
const CardSchema = mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
});

// Give my model a name and tell my MongoDB what schema to use when creating data.
module.exports = mongoose.model('Cards', CardSchema);
