import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [notes, setnotes] = useState([])

  function fetchNotes() {
    axios.get('http://localhost:3000/notes')
      .then((res) => {
        setnotes(res.data.notes)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const { title, description } = e.target
    axios.post('http://localhost:3000/notes', {
      title: title.value,
      description: description.value
    })
    .then((res) => {
      console.log(res.data)
      e.target.reset()
      fetchNotes()
    })
    .catch((err) => console.error(err))
  }

  function handleDelete(noteId) {
    axios.delete(`http://localhost:3000/notes/${noteId}`)
      .then((res) => {
        console.log(res.data)
        fetchNotes()
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input type="text" name='title' placeholder='Enter Title' />
        <input type="text" name='description' placeholder='Enter Description' />
        <button className='button' type='submit'>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button className='button delete' onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
