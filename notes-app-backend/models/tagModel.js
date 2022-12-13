const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp')
const tagSchema = new mongoose.Schema({
  tagId: {
    type: String,
  },
  text: {
    type: String,
  },
});
const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;