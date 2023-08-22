import {useState} from 'react'
import {FormGroup, Form, Row, Col, Button, FloatingLabel} from 'react-bootstrap'

const NoteForm = ({createNote}) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const ratings = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"]
    const genres = ["Action and adventure", "Art/architecture", "Alternate history", "Autobiography", "Anthology", "Biography", 
    "Business/economics", "Children's", "Crafts/hobbies", "Classic", "Cookbook", "Comic book", "Coming-of-age", "Crime", "Drama", 
    "Dystopian", "Fairytale", "Health/fitness", "Fantasy", "History", "Graphic novel", "Home and garden", "Historical fiction", "Humor",
    "Horror", "Mystery", "Memoir", "Philosophy", "Poetry", "Political", "Religion, spirituality, new age", "Romance", "Satire", 
    "Science fiction", "Short story", "Science", "Sports and leisure", "Suspense", "Self help", "Thriller", "Travel", "True crime", 
    "Young adult"]
    const years = Array.from(
        {length: 50},
        (_, index) => new Date().getFullYear() - index
    )

    const [newTitle, setNewTitle] = useState('')
    const [newGenre, setNewGenre] = useState(genres[0])
    const [newAuthor, setNewAuthor] = useState('')
    const [newMonth, setNewMonth] = useState(months[0])
    const [newYear, setNewYear] = useState(years[0])
    const [newRating, setNewRating] = useState(ratings[0])
    const [newReview, setNewReview] = useState('')

    
    const addNote = (event) => {
        event.preventDefault()
        createNote({
            title: newTitle,
            important: false,
            genre: newGenre,
            author: newAuthor,
            month: newMonth,
            year: newYear,
            rating: newRating.split(' ')[0],
            review: newReview
        })
        setNewTitle('')
        setNewAuthor('')
        setNewGenre(genres[0])
        setNewMonth(months[0])
        setNewYear(years[0])
        setNewRating(ratings[0])
        setNewReview('')
    }

    const handleTitleEdit = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorEdit = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleGenreEdit = (event) => {
        setNewGenre(event.target.value)
    }

    const handleMonthEdit = (event) => {
        setNewMonth(event.target.value)
    }

    const handleYearEdit = (event) => {
        setNewYear(event.target.value)
    }

    const handleRatingEdit = (event) => {
        setNewRating(event.target.value)
    }

    const handleReviewEdit = (event) => {
        setNewReview(event.target.value)
    }

    return (
        <div>
            <h4>Add a new entry</h4>
            <Form onSubmit={addNote}>
                <Row>
                    <Col>
                        <div style={{paddingBottom: 10}}>
                            <FloatingLabel label='Title'>
                                <Form.Control
                                type="text"
                                id="title"
                                name="title"
                                placeholder='Title'
                                onChange={handleTitleEdit}
                                value={newTitle}
                                />
                            </FloatingLabel>
                        </div>
                    </Col>
                    <Col>
                        <div style={{paddingBottom: 10}}>
                            <FloatingLabel label='Author'>
                                <Form.Control
                                type="text"
                                id="author"
                                name="author"
                                placeholder='Author'
                                onChange={handleAuthorEdit}
                                value={newAuthor}
                                />
                            </FloatingLabel>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <FormGroup id="formGenre" xs="auto" as={Col}>
                            <Form.Label>Genre</Form.Label>
                            <Form.Select id="genre" onChange={handleGenreEdit} value={newGenre}>
                                {genres.map((genre, idx) => (
                                    <option key={idx} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </Form.Select>
                    </FormGroup>
                        <FormGroup id="formMonth" as={Col}>
                            <Form.Label>Month Read</Form.Label>
                            <Form.Select id="month" onChange={handleMonthEdit} value={newMonth}>
                                {months.map((month, idx) => (
                                    <option key={idx} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </Form.Select>
                        </FormGroup>
                        <FormGroup id="formYear" as={Col}>
                            <Form.Label>Year Read</Form.Label>
                            <Form.Select name="year" onChange={handleYearEdit} value={newYear}>
                                {years.map((year, idx) => (
                                    <option key={idx} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </Form.Select>
                        </FormGroup>
                        <FormGroup id="formRating" as={Col}>
                            <Form.Label>Rating</Form.Label>
                            <Form.Select name="rating" onChange={handleRatingEdit} value={newRating}>
                                {ratings.map((rating, idx) => (
                                    <option key={idx} value={rating}>
                                        {rating}
                                    </option>
                                ))}
                            </Form.Select>
                        </FormGroup>
                </Row>
                <Row>
                        <FormGroup id="formReview" style={{paddingTop:10}}>
                            <Form.Label>Short Review</Form.Label>
                            <FloatingLabel label='Penny for your thoughts?'>
                                <Form.Control
                                    as='textarea'
                                    style={{height: '200px'}}
                                    id="review"
                                    name="review"
                                    placeholder='Penny for your thoughts?'
                                    onChange={handleReviewEdit}
                                    value={newReview}
                                    />
                            </FloatingLabel>
                        </FormGroup>
                </Row>
                <div style={{paddingTop: 20, paddingBottom: 5}}>
                    <Button type="submit"> Save </Button>
                </div>
            </Form>
        </div>
    )
}

export default NoteForm