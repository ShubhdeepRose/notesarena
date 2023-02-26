
import NoteMapper from "./NoteMapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ViewNote = ({ note }) => {
  const [search, setSearch] = useState(note);
  useEffect(() => {
    setSearch(note);
  }, [note]);
  const handleSearch = (e) => {
    if (e.target.value.trim().length === 0) return setSearch(note);
    const noteArray = note.filter((note) => (
      note.title.toLowerCase().includes(e.target.value.toLowerCase().replace(/\s+/g, ' ').trim()) || note.description.toLowerCase().includes(e.target.value.toLowerCase().replace(/\s+/g, ' ').trim())
    ));
    setSearch(noteArray);
  }


  return (
    <main>
      {note && note.length ? (
        <div className="notes-cols-wrapper">
          <div className="search">
            <input
              type="text"
              placeholder='search !'
              autoFocus={true}
              onChange={(e) => { handleSearch(e) }}
            />
            <FontAwesomeIcon icon={faSearch} className="hidden" />
          </div>

          <NoteMapper
            note={search}
          />
        </div>
      ) : (
        <div className="empty">
          <h2>No available notes !</h2>
          <p>Don't worry, You can write notes.</p>
          <p>
            <Link to='/notes'>Visit AddNotes</Link>
          </p>

        </div>
      )}
    </main>
  );
};

export default ViewNote;
