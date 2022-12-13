import React, { useState } from 'react'
import NoteForm from './notesForm';
import { RiCloseCircleLine } from "react-icons/ri"
import {MdDeleteOutline} from 'react-icons/md';

function Tag({allTags, selectedTags, handleTagEdit, handleFilter, handleDelete}) {

  const [isChecked, setIsChecked] = useState(true);
  const [showButtons, setShowButtons] = useState(false);

  const checkChecked = (thisTag) => {
    const tempArr = selectedTags.filter(t => t.tagId === thisTag.tagId);
    return (tempArr.length > 0 ? true : false);
  }
  return allTags.map ((tag, index) => (
    <div className='singleTag' key={index} onMouseOver={() => setShowButtons(true)} onMouseLeave={() => {setShowButtons(false)}}>
      <div key={tag.tagId} className='tagText'>
        <div className='tagSelectCheck'>
          <input type="checkbox" checked={checkChecked(allTags[index], isChecked)} onChange={() => {
            handleFilter(allTags[index]);
            setIsChecked(!isChecked);
          }} className={checkChecked(allTags[index], isChecked)?'tagChecked':'tagUnchecked'}/>
        </div>
        <div className='tagTextArea' onClick={() => {handleTagEdit(tag);}}>
          {tag.text.substring(0, 40)}
        </div>
      </div>
      {showButtons && <MdDeleteOutline style={{height: '21px', width: '22px', marginRight: '15px'}}  onClick={() => {handleDelete(allTags[index])}}/>}
    </div>
  ))
}

export default Tag