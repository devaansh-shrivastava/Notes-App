const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
  noteId: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  tags: {
    type: Object,
  }
});
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;