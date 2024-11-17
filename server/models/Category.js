const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
    trim: true
  },
  description: {
    type: String
  },
  slug: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);