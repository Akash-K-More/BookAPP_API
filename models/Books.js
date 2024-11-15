const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the User collection
});

module.exports = mongoose.model('Book', bookSchema);