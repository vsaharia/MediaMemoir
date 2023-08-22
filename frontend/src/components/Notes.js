import {Button, Accordion, Table} from 'react-bootstrap'

const Notes = ({notes, toggleFavorite}) => {

  const months = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"]

    return (
    <Accordion key={`accordion${notes[0].year}`} defaultActiveKey="0" style={{paddingBottom: 10}} alwaysOpen>
      {months.map((month, index) => {
        const monthlyNotes = notes.filter(note => note.month === month)
        monthlyNotes.sort((note1, note2) =>  (note1.title > note2.title) ? 1 : ((note2.title > note1.title) ? -1 : 0))
        if (monthlyNotes.length !== 0) { 
          return (
            <Accordion.Item key={`item${month}`} eventKey={`${index}`}>
              <Accordion.Header key={`header${month}`}>{month}</Accordion.Header>
              <Accordion.Body key={`body${month}`}>
              <Table key={`table${month}`} striped bordered hover>
                <thead key={`thead${month}`}>
                  <tr key={`trHeader${month}`}>
                    <th key={`titleHeader${month}`}>Title</th>
                    <th key={`authorHeader${month}`}>Author</th>
                    <th key={`genreHeader${month}`}>Genre</th>
                    <th key={`ratingHeader${month}`}>Rating</th>
                    <th key={`reviewHeader${month}`}>Review</th>
                    <th key={`toggleHeader${month}`}>Toggle Favorite</th>
                  </tr>
                </thead>
                <tbody key={`tbody${month}`}>
                  {monthlyNotes.map(note => {
                    return (
                      <tr key={`row${note.id}`}>
                        <td key={`title${note.id}`} className='note'>
                          {note.title}
                        </td>
                        <td key={`author${note.id}`} className='note'>
                          {note.author}
                        </td>
                        <td key={`genre${note.id}`} className='note'>
                          {note.genre}
                        </td>
                        <td key={`rating${note.id}`} className='note'>
                          {[...Array(note.rating)].map((star, index) => {        
                            return (         
                              <span key={`${star}${index}`} className="star">&#9733;</span>        
                            )
                          })}
                        </td>
                        <td key={`review${note.id}`} className='note'>
                          {note.review}
                        </td>
                        <td key={`toggle${note.id}`}>
                          <Button key={`button${note.id}`} variant='secondary' onClick = {() => toggleFavorite(note.id)}>
                            {note.important ? 'Unfavorite' : 'Favorite'}
                          </Button>
                        </td>
                    </tr>
                    )}
                  )}
              </tbody>
              </Table>
              </Accordion.Body>
            </Accordion.Item>
          )
        }
      return null;
      }
      )}
    </Accordion>
  )
}

export default Notes;