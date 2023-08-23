import {useState, useEffect, useRef} from 'react';
import Notes from './components/Notes'
import Notification from './components/Notification'
import Login from './components/Login'
import NoteForm from './components/NoteForm';
import Toggle from './components/Toggle'
import noteService from './services/notes'
import loginService from './services/login'
import {Button} from 'react-bootstrap'

import './index.css'

const App = () => {

  const jose = require('jose')

  const years = Array.from(
    { length: 50 },
    (_, index) => new Date().getFullYear() - index
  )
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  let tokenInterval = null;

  const checkTokenExpired = async () => {
    console.log('checking token expiry')
    try {
      await noteService
        .create({
          title: 'random',
          important: false,
          genre: 'test',
          author: 'test',
          month: 'January',
          year: '1',
          rating: 5,
          review: 'this request is for token verification purposes.'
        })
    }
    catch(exception) {
      document.getElementById('logoutButton').click()
      clearInterval(tokenInterval)
      tokenInterval = null
      setErrorMessage("Logged out automatically after 1 hour.")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      const userDetails = window.localStorage.getItem('loggedInUser')
      if (userDetails) {
        const user = JSON.parse(userDetails)
        const secret = new TextEncoder().encode(
          process.env.REACT_APP_SECRET,
        )
        try {
          const decodedToken = await jose.jwtVerify(user.token, secret)
          console.log(decodedToken)
          if (decodedToken.payload) {
            setUser(user)
            noteService.setToken(user.token)
          }
        }
        catch {
          noteService.setToken(null)
          setUser(null)
          window.localStorage.removeItem('loggedInUser')
        }
      }
    }
    checkLoggedIn()
  }, [])

  useEffect(() => {
    function grabNotes() {
      if (user) {
        setNotes([])
        noteService
        .getAll()
        .then(initialNotes => {
          initialNotes = initialNotes.filter(note => note.user.username === user.username)
          setNotes(initialNotes)
        })
      }
    }
    grabNotes();
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      tokenInterval = setInterval(checkTokenExpired, 1000*60*60)
    }
    catch (exception) {
      setUsername('')
      setPassword('')
      setErrorMessage('Error: Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    noteService.setToken(null)
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  let notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Error: '${note.title}' was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    try {
      await noteService
        .create(noteObject)
        .then(addedNote => {
          setNotes(notes.concat(addedNote))
        })
      setErrorMessage('Success: Note saved')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
    catch(exception) {
      setErrorMessage("Error: Please enter your book's details again. You probably left a field blank or had a review shorter than 20 characters.")
      setTimeout(() => {
        setErrorMessage(null)
      }, 7500)
    }
  }

  const loginForm = () => (
    <Login
      username={username}
      password={password}
      setUsername={({target}) => setUsername(target.value)}
      setPassword={({target}) => setPassword(target.value)}
      submit={handleLogin}
    />
  )

  const noteForm = () => (
    <Toggle label='New entry' ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Toggle>
  )

  const logoutButton = () => (
    <Button id="logoutButton" onClick={handleLogout}>
      Sign out
    </Button>
  )

  const importanceButton = () => (
    <div style={{paddingTop: 30, paddingBottom: 30}}>
      <Button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Favorites': 'All'}
      </Button>
    </div>
  )

  const notesList = () => (
    years.map(year => {
      const yearlyNotes = notesToShow.filter(note => note.year === year)
      if (yearlyNotes.length !== 0) {
        return (
            <div key={year}>
              <h3>
                  {year}
              </h3>
              <Notes
                key={`table${year}`}
                notes={yearlyNotes}
                toggleFavorite={toggleImportanceOf}
              />
            </div>
        )
      }
      return null;
    })
  )

  return (
    <div className='container'>
      <h1 style={{paddingBottom: 20, textAlign: 'center'}}>Media Memoir</h1>
      <h4 style={{paddingBottom: 20}}>
        Welcome to your Media Memoir. Here you can keep track of the various forms of media you consume.
        Currently, there is only support for books. I plan to add support for TV, movies, and music albums. 
      </h4>
      <Notification message={errorMessage}/>
      {user === null && loginForm()}
      {user !== null && logoutButton()}
      {user !== null && 
        <div>
          <p><em>{user.name} logged in</em></p>
          {noteForm()}
        </div>
      }
      <div>
        {user !== null && importanceButton()}
      </div>
      {user !== null && notesList()}
    </div>
  )
}

export default App;