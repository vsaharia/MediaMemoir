import {Alert} from 'react-bootstrap'

const Notification = ({message}) => {

    if (message === null) {
        return null
    }

    let type = 'warning'

    if (message.startsWith('Success')) {
        type = 'success'
    }
    
    return (
        <Alert variant={type}>
            {message}
        </Alert>
    )
}

export default Notification;