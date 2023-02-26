import React, { useRef } from "react";

const AddNote = ({
  handleFormSubmit,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  const inputRef = useRef();
  return (
    <form onSubmit={handleFormSubmit} className="addNote">

      <div className="title">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          autoFocus={true}
          ref={inputRef}
          required={true}
          value={title}
          placeholder="Title"
        />
      </div>

      <div className="description">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          cols="28"
          rows="6"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required={true}
          placeholder="what's on your mind ?"
        ></textarea>
      </div>

      <div className="button">
        <button type="submit" onClick={(e) => inputRef.current.focus()}>
          Add Note
        </button>
      </div>
    </form>
  );
};

export default AddNote;
