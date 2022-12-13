const HTTPStatus = require('http-status-codes');
const Note = require('../models/noteModel');
const Tag = require('../models/tagModel');
module.exports.getNotes = async (req, res) => {
  const tempTags = req.query.tags;
  if(!tempTags) {
    if(req.query.searchParam) {
      const searchParam = req.query.searchParam;

      if(req.query.searchType === 'true') {

        const notes = await Note.find().or([{ title: { $regex: searchParam, $options: 'ig' }}, { content: { $regex: searchParam, $options: 'ig' }}]).collation({locale:'en',strength: 2}).sort({title:1});
        return res.status(HTTPStatus.OK).json(notes);
      }

      const notes = await Note.find().or([{ title: { $regex: searchParam }}, { content: { $regex: searchParam }}]).collation({locale:'en',strength: 2}).sort({title:1});
      return res.status(HTTPStatus.OK).json(notes)
    } 

    const notes = await Note.find().collation({locale:'en',strength: 2}).sort({title:1});
    return res.status(HTTPStatus.OK).json(notes);
  }

  const temp = tempTags.split(/[,]/);
  let tagsIds = [];
  temp.forEach(t => {
    tagsIds.push(Number(t));
  });

  const tags = await Tag.find({tagId: { $in: tagsIds}});

  try {
    if(req.query.searchParam) {
      const searchParam = req.query.searchParam;

      if(req.query.searchType === 'true') {
        const notes = await Note.find({tags: { $all: tags } }).or([{ title: { $regex: searchParam, $options: 'ig' }}, { content: { $regex: searchParam, $options: 'ig' }}]).collation({locale:'en',strength: 2}).sort({title:1});
        return res.status(HTTPStatus.OK).json(notes);
      }

      const notes = await Note.find({tags: { $all: tags } }).or([{ title: { $regex: searchParam }}, { content: { $regex: searchParam }}]).collation({locale:'en',strength: 2}).sort({title:1});
      return res.status(HTTPStatus.OK).json(notes)
    } 

    const notes = await Note.find({tags: { $all: tags } }).collation({locale:'en',strength: 2}).sort({title:1});

    return res.status(HTTPStatus.OK).json(notes);
  } catch (err) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send();
  }
};
module.exports.manipulateNotes = async (req, res) => {
  const query = req.query.funct;
  const noteId = req.query.noteId;
  const noteTitle = req.query.noteTitle;
  const noteContent = req.query.noteContent;
  const noteTags = req.query.noteTags;

  const temp = noteTags.split(/[,]/);
  let tagsIds = [];
  temp && temp.forEach(t => {
    tagsIds.push(Number(t));
  });
  const tags = await Tag.find({tagId: { $in: tagsIds}});

  if (query === 'add') {
    const thisNote = {
      noteId: noteId,
      title: noteTitle,
      content: noteContent,
      tags: tags
    };

    await Note.insertMany([thisNote]);
  } else if (query === 'remove') {
    await Note.deleteOne({noteId: noteId});
  } else {
    await Note.deleteOne({noteId: noteId});

    const thisNote = {
      noteId: noteId,
      title: noteTitle,
      content: noteContent,
      tags: tags
    };
    await Note.insertMany([thisNote]);
  }
  return res.status(HTTPStatus.OK);
};