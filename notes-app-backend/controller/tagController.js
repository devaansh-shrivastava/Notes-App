const HTTPStatus = require('http-status-codes');
const Tag = require('../models/tagModel');
module.exports.getTags = async (req, res) => {
  const tags = await Tag.find().collation({locale:'en',strength: 2}).sort({text:1});
  return res.status(HTTPStatus.OK).json(tags);
}
module.exports.manipulateTags = async (req, res) => {
  const query = req.query.funct;
  
  const tagId = req.query.tagId;
  const tagText = req.query.tagText;
  const tag = {tagId: tagId, text: tagText};
  if (query === 'add') {
    await Tag.insertMany([tag]);
  } else if (query === 'remove') {
    await Tag.deleteOne({tagId: tag.tagId});
  } else {
    await Tag.deleteOne({tagId: tag.tagId});
    await Tag.insertMany([tag]);
  }
  return res.status(HTTPStatus.OK);
};