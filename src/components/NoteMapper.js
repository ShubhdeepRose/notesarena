import React from "react";
import ActualNotes from "./ActualNotes";

const NoteMapper = ({ note }) => {
  return (
    <>
      {note.length > 0 ? (
        <div className="notes-cols">
          {note.map((note) => (
            <ActualNotes
              key={note.id}
              note={note}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Notes Found!</h2>
          <p>There are no notes found with this keyword</p>
        </div>
      )}
    </>
  );
};

export default NoteMapper;

