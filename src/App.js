import React, { useState } from "react";
import { format } from 'date-fns'
import AddNote from "./components/AddNote";
import ViewNotes from "./components/ViewNote";
import EditNote from "./components/EditNote";
import Header from "./components/Header";
import NotePage from "./components/NotePage";

import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [note, setNote] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const mime = ["application/json"]
  let file;
  const history = useNavigate();



  const handleNoteSubmit = () => {
    const id = note.length > 0 ? note[note.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newNote = {
      id: id,
      title: title,
      description: description,
      time: datetime,
    };
    const noteList = [...note, newNote];
    setNote(noteList);
    localStorage.setItem("notes", JSON.stringify(noteList));
    history('/');
  };

  const handleDelete = (id) => {
    const deleteNote = note.filter((note) => note.id !== id);
    setNote(deleteNote);
    localStorage.setItem("notes", JSON.stringify(deleteNote));
    history('/');
  };


  const handleDeleteAll = () => {
    localStorage.clear();
    setNote([]);
  }

  const handleUpdate = (id) => {
    const updateDateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedNote = {
      id: id,
      title: editTitle,
      description: editDescription,
      time: updateDateTime,
    };
    const updateObject = note.map((note) => (note.id === id ? { ...updatedNote } : note));
    setNote(updateObject);
    localStorage.setItem("notes", JSON.stringify(updateObject));
    setEditDescription("");
    setEditTitle("");
    history('/');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title && !description) return;
    handleNoteSubmit();
    setTitle("");
    setDescription("");
  };

  const handleExport = () => {
    if (note.length === 0) {
      return;
    }
    const json = JSON.stringify(note, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'notes';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }


  const onReaderLoad = (e) => {
    try {
      const objParsed = JSON.parse(e.target.result);
      setNote(objParsed);
      localStorage.setItem("notes", JSON.stringify(objParsed));
    } catch (err) {
      alert(`Invalid File: ${err}`);
    }
  }

  const handleFileImport = (e) => {
    file = e.target.files[0];
    let fileType = file.type;
    if (mime.includes(fileType)) {
      let reader = new FileReader();
      reader.onload = onReaderLoad;
      reader.readAsText(e.target.files[0]);
    }
    else {
      alert("Invalid File Type");
      e.target.value = null;
    }
  }

  return (
    <div className="App">
      <Header
        handleDeleteAll={handleDeleteAll}
        handleExport={handleExport}
        handleFileImport={handleFileImport}
        note={note}
        
      />
      <Routes>
        <Route
          path="/"
          element={
            <ViewNotes
              note={note}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          }
        ></Route>
        <Route
          path="/notes"
          element={
            <AddNote
              handleFormSubmit={handleFormSubmit}
              title={title}
              description={description}
              setTitle={setTitle}
              setDescription={setDescription}
            />
          }
        ></Route>
        <Route
          path="/edit/:id"
          element={
            <EditNote
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editDescription={editDescription}
              setEditDescription={setEditDescription}
              handleUpdate={handleUpdate}
              note={note}
            />
          }
        ></Route>

        <Route
          path="/notes/:id"
          element={<NotePage note={note} handleDelete={handleDelete} />}
        ></Route>

      </Routes>
    </div>
  );
}

export default App;
