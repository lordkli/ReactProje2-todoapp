import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NoteForm from "./components/note-form";
import Notes from "./components/notes";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    axios("https://jsonplaceholder.typicode.com/posts").then((resp) =>
      setNotes(resp.data)
    );
  };

  const removeNote = (id) => {
    if (!id) return;

    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((resp) => {
        // 1. ALTARNATIF
        const arr = notes.filter((item) => item.id != id);
        setNotes(arr);
        // 2: ALTARNATIF
        // loadNotes();
        alert("Note was deleted")
      })
      .catch((err) => {
        alert("An error occured");
      });
  };
  const createNote = (note) => {
    axios.post("https://jsonplaceholder.typicode.com/posts", note)
    .then(resp => {
      setNotes([resp.data, ...notes])
      // const arr = notes.push(note);
      // setNotes(arr);
    })
  }

  return (
    <Container>
      <Row>
        <Col md={3}>
          <NoteForm createNote ={createNote} />
        </Col>
        <Col md={9}>
          <Notes data={notes} removeNote={removeNote} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
