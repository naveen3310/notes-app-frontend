import React from "react";
import AddNote from "./AddNote";

function Home(props) {
  const { showAlert } = props.showAlert;
  return (
    <>
      <AddNote showAlert={props.showAlert} />
    </>
  );
}

export default Home;
