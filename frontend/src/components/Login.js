import {Form, Button} from 'react-bootstrap'

const Login = ({username, password, setUsername, setPassword, submit}) => {
    return (
    <div style={{paddingTop:50}}>
      <Form onSubmit={submit}>
          <Form.Group>
            <div>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={setUsername}
              />
            </div>
            <div style={{paddingTop:20}}>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={setPassword}
              />
              <div style={{paddingTop:20}}></div>
              <Button type="submit"> Login </Button>
            </div>
          </Form.Group>
      </Form>
    </div>
    )
}

export default Login;