import React, { useState } from 'react'
import NoteForm from './notesForm';
import { AiOutlineDelete } from "react-icons/ai"

function Note({allNotes, handleEdit, removeNote}) {

  const handleDelete = (note) => {
    removeNote(note);
  }
  return allNotes.map ((note, index) => (
    <div className='singleNote' key={index}>
      <div onClick={() => handleEdit(note)}>
        <div className='noteTitle'>
          {note.title.substring(0, 60)}
        </div>
        <div className='noteContent'>
          {note.content.substring(0, 160)}
        </div>
      </div>
    </div>
  ))
}

export default Note