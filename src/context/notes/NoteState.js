import NoteContext from "./noteContext";
import react, { useState } from "react";

const NoteState = (props) => {
  const URL = process.env.PORT || "http://localhost:5000";
  const notesInitial = [];
  //add a note
  const [notes, setNotes] = useState(notesInitial);
  //fetch notes from mongo
  async function getNotes(id, title, description, tag) {
    const response = await fetch(`${URL}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Contect-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const responseValue = await response.json();
    setNotes(responseValue);
  }

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${URL}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = await response.json();
    getNotes();
  };

  // TODO: API Call
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${URL}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //edit note
  async function editNote(id, title, description, tag) {
    const response = await fetch(`${URL}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const responseValue = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(notes);
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
