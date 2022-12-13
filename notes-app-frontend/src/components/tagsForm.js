import React, { useState } from 'react'
import './tagsForm.css';
import {MdCancel} from 'react-icons/md';
function TagsForm({tag, idGenerator, setTagsFormVisible, onTagSubmit, onTagCancel, removeTag}) {
  const [thisId, setId] = useState(tag ? tag.tagId : idGenerator());
  const [thisText, setText] = useState(tag ? tag.text : '');

  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  const handleDelete = () => {
    const temp = {
      tagId: thisId,
      text: thisText,
    }
    removeTag(temp);

    tag = null;
    setId('');
    setText('');

    setTagsFormVisible(false);
  }
  const handleSubmit = () => {
    if (!thisText) {
      return;
    }
    const temp = {
      tagId: thisId,
      text: thisText,
    }

    if(tag) {
      removeTag(tag);
    }
    onTagSubmit(temp);

    setId('');
    setText('');

    setTagsFormVisible(false);
  }

  return (
    <div className='tagsFormBG'
    onKeyDown={(e) => {(e.key === 'Enter') ? handleSubmit() : <></>}}
    >
      <div className='tagsForm'>
        <MdCancel onClick={() => {onTagCancel()}} style={ { position: 'absolute', top: '5px', right: '5px', marginBottom: '5px', height: '22px', width: '22px', borderRadius: '22px', color: '#ffffffa0' } }/>
        <h2>Tag</h2>
        <form className='tags-Form'>
          <div className='input'>
            <textarea 
            type="text" 
            value={thisText.replace(/\\n/g, `\n`)} 
            placeholder={tag ? tag.text : "Tag Text"} 
            name="text" 
            className='tagTextInput'
            style={ { 'whiteSpace': 'pre-line', } }
            onChange={handleTextChange}></textarea>
          </div>
        </form>

        <div className='formActionButtons'>
          {tag && <button className='tagsFormButtons' onClick={() => {handleDelete()}}>Delete</button>}
          <button className='tagsFormButtons' onClick={() => {handleSubmit()}}>{tag ? 'Update' : 'Add'}</button>
        </div>
      </div>
    </div>
  )
}

export default TagsForm