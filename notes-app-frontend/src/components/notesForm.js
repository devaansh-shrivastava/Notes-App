import React, { useState } from 'react'
import './notesForm.css';
import {MdCancel} from 'react-icons/md';
function NotesForm({note, tags, idGenerator, setFormVisible, onSubmit, onCancel, removeNote, addNote}) {
  const [thisId, setId] = useState(note ? note.noteId : idGenerator());
  const [thisTitle, setTitle] = useState(note ? note.title : '');
  const [thisContent, setContent] = useState(note ? note.content : '');
  const [thisTags, setTags] = useState(note ? note.tags : []);
  const [noteTagsVisible, setNoteTagsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const checkChecked = (tag) => {
    const temp = thisTags.filter(t => t.tagId === tag.tagId);

    if (temp.length > 0) {return true;}
    else {return false;}
  }
  const handleTitleChange = (e) => {
    setTitle((e.target.value).replace(/\\n/g, `\n`));
  }
  const handleContentChange = (e) => {
    setContent(e.target.value);
  }
  const handleDelete = () => {
    const temp = {
      noteId: thisId,
      title: thisTitle,
      content: thisContent,
      tags: thisTags,
    }
    removeNote(temp);

    note = null;
    setId('');
    setTitle('');
    setContent('');
    setTags([]);

    setFormVisible(false);
  }
  const handleSubmit = () => {
    if(!thisTitle || !thisContent) {
      return;
    }

    const temp = {
      noteId: thisId,
      title: thisTitle,
      content: thisContent,
      tags: thisTags,
    }
    onSubmit(temp);

    setId('');
    setTitle('');
    setContent('');
    setTags([]);

    setFormVisible(false);
  }
  const handleTagToggle = (thisTag) => {
    const temp = thisTags.filter(t => t.tagId !== thisTag.tagId);
    if (temp.length === thisTags.length) {
      const temp2 =  thisTags;
      temp2.push(thisTag);
      setTags(temp2);
    } else {
      setTags(temp);
    }
  }

  return (
    <div className='notesFormBG'>
      <div className='notesForm'>
        <MdCancel onClick={() => {onCancel()}} style={ { position: 'absolute', top: '5px', right: '5px', marginBottom: '5px', height: '22px', width: '22px', borderRadius: '22px', color: '#ffffffa0' } }/>
        <h2>Note</h2>
        <form className='form'>
          <div className='input'>
            <textarea 
            type="text" 
            value={thisTitle.replace(/\\n/g, `\n`)}
            placeholder={note ? (note.title).replace(/\\n/g, `\n`) : "Note Title"} 
            name="text" 
            className='noteTitleInput'
            style={ { 'whiteSpace': 'pre-line', } }
            onChange={handleTitleChange} />
          </div>

          <div className='input'>
            <textarea 
            type="text" 
            value={thisContent.replace(/\\n/g, `\n`)} 
            placeholder={note ? note.content.replace(/\\n/g, `\n`) : "Note Content"}
            name="text" 
            className='noteContentInput'
            style={ { 'whiteSpace': 'pre-line', } }
            onChange={handleContentChange}></textarea>
          </div>
        </form>

        <div className='notesFormActionButtons'>
          <div className='noteTagsDisplay'>
            <button className='noteTagsButton' onClick={() => {setNoteTagsVisible(!noteTagsVisible)}}>Tags</button>
            {noteTagsVisible && <div className='singleNoteTagsDisplay'>
                {
                  tags.map((tag, index) => {
                    return (
                      <div className='singleNoteTags' key={index}>
                        {
                          tag.tagId !== -1 && <div key={tag.tagId} className='noteTagText'>
                            <input type="checkbox" checked={checkChecked(tags[index], isChecked)} onChange={() => {
                              handleTagToggle(tags[index]);
                              setIsChecked(!isChecked);
                            }}/>
                            <div className='noteTagTextBox'>
                              {tag.text.slice(0, 40)}
                            </div>
                          </div>
                        }
                      </div>
                    );
                  })
                }
              </div>
            }
          </div>
          <div className='buttonsDiv'>
            {note && <button onClick={() => {handleDelete()}}>Delete</button>}
            <button onClick={() => {handleSubmit()}}>{note ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotesForm