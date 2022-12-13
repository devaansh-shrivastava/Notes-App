import axios from 'axios';

const getNotes = async (tags, searchParam, searchType) => {
  let queryString = [];
  tags.forEach(tag => {
    queryString.push(tag.tagId);
  })

  if (queryString.length > 0) {
    if(searchParam) {
      return await axios.get(`/api/v1/notes/getNotes?tags=${queryString}&&searchParam=${searchParam}&&searchType=${searchType}`);
    } else {
      return await axios.get(`/api/v1/notes/getNotes?tags=${queryString}`);    
    }
  } else {
    if(searchParam) {
      return await axios.get(`/api/v1/notes/getNotes?searchParam=${searchParam}&&searchType=${searchType}`);
    } else {
      return await axios.get(`/api/v1/notes/getNotes`);    
    }
  }
};

const manipulateNotes = async (note, query) => {
  let tags = [];
  note.tags.forEach(tag => {
    tags.push(tag.tagId);
  });

  return await axios.get(`/api/v1/notes/manipulateNotes?funct=${query}&&noteId=${note.noteId}&&noteTitle=${note.title.replace(/\n/g, `\\n`)}&&noteContent=${note.content.replace(/\n/g, "\\n")}&&noteTags=${tags}`); 
};

export default { getNotes, manipulateNotes };