import React, { useContext, useState } from "react";
import Note from "./Note";
import noteContext from "../context/notes/noteContext";
function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  function submitNote(e) {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added", "success");
  }
  function handleChange(e) {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            Write something....
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="description"
            value={note.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="tag"
            value={note.tag}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          onClick={submitNote}
          className="btn btn-primary"
        >
          ADD NOTE
        </button>
      </form>
      {/*Notes*/}
      <Note />
    </div>
  );
}
export default AddNote;
