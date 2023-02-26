import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditNote = ({
  note,
  handleUpdate,
  setEditTitle,
  editTitle,
  setEditDescription,
  editDescription,
}) => {
  const { id } = useParams();
  const post = note.find((note) => (note.id).toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditDescription(post.description);
    }
  }, []);
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="editNote addNote">
        <div className="title">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            autoFocus={true}
            required={true}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </div>

        <div className="description">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            cols="28"
            rows="6"
            value={editDescription}
            required={true}
            onChange={(e) => setEditDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="button">
          <button type="submit" onClick={() => handleUpdate(post.id)}>Update Note</button>
        </div>

      </form>
    </div>
  );
};

export default EditNote;
