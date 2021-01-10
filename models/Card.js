const mongoose = require('mongoose');

// Create my schema
const CardSchema = mongoose.Schema({
  question: String,
  answer: String,
  category: String,
});

// Give my model a name and tell my MongoDB what schema to use when creating data.
module.exports = mongoose.model('Cards', CardSchema);
