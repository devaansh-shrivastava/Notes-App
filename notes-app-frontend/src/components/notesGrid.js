import React, { useState, useEffect } from 'react'
import NotesForm from './notesForm';
import TagsForm from './tagsForm';
import Notes from './note';
import Tags from './tag';
import NoteService from '../services/noteService';
import TagService from '../services/tagService';
import {BsSearch} from 'react-icons/bs';
import {BiMenu} from 'react-icons/bi';
import {RiPlayListAddFill} from 'react-icons/ri';
import {HiViewGridAdd} from 'react-icons/hi';
import LoadingScreen from './loadingScreen';
export default function NotesGrid() {
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [updationNote, setUpdationNote] = useState(null);
  const [updationTag, setUpdationTag] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [tagsFormVisible, setTagsFormVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState([]);
  const [renderNew, setRenderNew] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState(false);
  const [searchBlock, setSearchBlock] = useState(false);
  const [searchCaseInsensitive, setSearchCaseInsensitive] = useState(true);
  const [loading, setLoading] = useState(false);

  const [headerBG, setHeaderBG] = useState('');
  const [headerFont, setHeaderFont] = useState('');
  const [tagsDisplayBG, setTagsDisplayBG] = useState('');
  const [tagBG, setTagBG] = useState('');
  const [tagFont, setTagFont] = useState('');
  const [notesDisplayBG, setNotesDisplayBG] = useState('');
  const [noteBG, setNoteBG] = useState('');
  const [noteFont, setNoteFont] = useState('');

  const getUI = async() => {
    setLoading(true);

    getTags();
    getNotes();

    setLoading(false);
  }

  const getNotes = async() => {
    setLoading(true);

    const res = await NoteService.getNotes(selectedTag, searchText, searchCaseInsensitive);
    setNotes(res.data);

    setLoading(false);
  }
  const getTags = async () => {
    setLoading(true);

    const res = await TagService.getTags();
    setTags(res.data);

    setLoading(false);
  }

  const addNote = async (thisNote) => {
    NoteService.manipulateNotes(thisNote, 'add');

    setLoading(true);
    await getNotes();

    setRenderNew(!renderNew);
    setLoading(false);
  };
  const addTag = async (thisTag) => {
    TagService.manipulateTags(thisTag, 'add');

    setLoading(true);
    await getTags();

    setRenderNew(!renderNew);
    setLoading(false);
  };
  const removeNote = async (thisNote) => {
    NoteService.manipulateNotes(thisNote, 'remove');
    setUpdationNote(null);

    setLoading(true);
    await getNotes();

    setRenderNew(!renderNew);
    setLoading(false);
  };
  const removeTag = async (thisTag) => {
    console.log(thisTag);
    TagService.manipulateTags(thisTag, 'remove');
    setUpdationTag(null);
    const arr = selectedTag;
    arr.filter(a => a.id !== thisTag.id);
    setSelectedTag(arr);

    setLoading(true);
    await getTags();

    setRenderNew(!renderNew);
    setLoading(false);
  };
  const updateNote = async (thisNote) => {
    NoteService.manipulateNotes(thisNote, 'update');
    setUpdationNote(null);

    setLoading(true);
    await getNotes();

    setRenderNew(!renderNew);
    setLoading(false);
  };
  const updateTag = async (thisTag) => {
    TagService.manipulateTags(thisTag, 'update');
    setUpdationTag(null);

    setLoading(true);
    await getTags();

    setRenderNew(!renderNew);
    setLoading(false);
  };
  const idGenerator = () => {
    let min = 0;
    let max = 10000;
    return Math.round(Math.random() * (max - min) + min);
  };
  const handleEdit = (thisNote) => {
    setUpdationNote(thisNote);
    setFormVisible(true);
  };
  const handleTagEdit = (thisTag) => {
    if (thisTag.tagId === -1) {return;}

    setUpdationTag(thisTag);
    setTagsFormVisible(true);
  };
  const handleFilter = (thisTag) => {
    const tempArr = selectedTag.filter(t => t.tagId !== thisTag.tagId);
    if (tempArr.length === selectedTag.length) {
      tempArr.push(thisTag);
      setSelectedTag(tempArr);
    } else {
      setSelectedTag(tempArr);
    }
    
    setRenderNew(!renderNew);
  };
  const handleSearch = async() => {
    setRenderNew(!renderNew);
  }
  const onCancel = () => {
    setUpdationNote(null);
    setFormVisible(false);
  };
  const onTagCancel = () => {
    setUpdationTag(null);
    setTagsFormVisible(false);
  };

  useEffect(() => {
    getUI();
  }, [renderNew]);

  return (
    <div className='notesGrid'>
      <div className='headerBar'>
        <div className='pageTitle'>My Notes</div>
        <div className='searchBlock' onMouseLeave={() => setSearchBlock(false)}> 
          {searchBlock && <div className='searchInBlock'>
            <input 
            placeholder='Search'
            value={searchText}
            disabled={!search}
            onKeyDown={(e) => {if (e.key === 'Enter') { handleSearch() }}}
            onMouseOver={() => setSearch(true)}
            onMouseLeave={() => setSearch(false)}
            onChange={(e) => setSearchText(e.target.value)}
            className={searchText || search ? 'searchBarActivated' : 'searchBar'}></input>
            <button className={searchCaseInsensitive ? 'searchInsensitive' : 'searchSensitive'} onClick={() => setSearchCaseInsensitive(!searchCaseInsensitive)}>Aa</button>
          </div>}
          <BsSearch style={{height: '30px', width: '30px', margin: '10px'}} onMouseEnter={() => setSearchBlock(true)} onClick={() => {setSearchBlock(false); handleSearch()}} />
          <BiMenu style={{height: '40px', width: '40px', margin: '10px'}} 
          />
        </div>
      </div>
      <div className='notesGridDisplay'>
        {loading && <LoadingScreen />}

        {formVisible && <NotesForm 
        note={updationNote} 
        tags={tags} 
        setFormVisible={setFormVisible} 
        onSubmit={(note) => {updationNote ? updateNote(note) : addNote(note)}} 
        idGenerator = {idGenerator} 
        onCancel={() => onCancel()} 
        removeNote={(note) => removeNote(note)}
        />}

        {tagsFormVisible && <TagsForm 
        tag={updationTag} 
        setTagsFormVisible={setTagsFormVisible} 
        onTagSubmit={(tag) => {updationTag ? updateTag(tag) : addTag(tag)}} 
        idGenerator = {idGenerator} 
        onTagCancel={() => onTagCancel()} 
        removeTag={(tag) => removeTag(tag)}/>}

        <div className='leftSide'>
          <div className='tagsDisplayArea'>
            {tags && <Tags allTags={tags} selectedTags={selectedTag} handleTagEdit={(tag) => handleTagEdit(tag)} handleFilter={(tag) => handleFilter(tag)} handleDelete={(tag) => removeTag(tag)}/>}
          </div>
          <RiPlayListAddFill className='addTagButton' onClick={() => {setTagsFormVisible(true)}}/>
        </div>
        <hr className='hr'></hr>
        <div className='rightSide'>
          <div className='notesDisplayArea'>
            {notes&&<Notes allNotes={notes} handleEdit={(note) => handleEdit(note)} removeNote={removeNote}/>}
          </div>
          <HiViewGridAdd className='addNoteButton' onClick={() => {setFormVisible(true)}}/>
        </div>
      </div>
      
    </div>
  )
}
