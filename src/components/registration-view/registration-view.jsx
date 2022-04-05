import React, { useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Rect Bootstrap
import { Row, Form, Button } from 'react-bootstrap';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  
  const handleSubmit = (e) => {
    
    e.preventDefault();
    axios.post('https://young-shelf-67619.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data)
      window.open('/', '_self');
      props.onLoggedIn(data)
    })
    .catch(e => {
      console.log('Error registering the user')
    });
  }

  return (
    <Row className='login-form justify-content-md-center mt-5' >
      <h1 style={{textAlign: 'center'}}> &#127916; myFlix Registration Page &#127909;</h1>
      <Form style={{ width: '30rem' }}>
        <Form.Group className="mb-3 mt-3" controlId='formUsername'>
          <Form.Label>*Username:</Form.Label>
          <Form.Control type='text' onChange={e => setUsername(e.target.value)}  placeholder='Please set your username' required />
        </Form.Group>

        <Form.Group className="mb-3" controlId='formPassword'>
          <Form.Label>*Password:</Form.Label>
          <Form.Control type='password' onChange={e => setPassword(e.target.value)} placeholder='Please set your password' minLength='8' required />
        </Form.Group>

        <Form.Group className="mb-3" controlId='formEmail'>
          <Form.Label>*Email:</Form.Label>
          <Form.Control type='email' onChange={e => setEmail(e.target.value)} placeholder='example@mail.com' required />
        </Form.Group>

        <Form.Group className="mb-4" controlId='formBirthday'>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type='date' onChange={e => setBirthday(e.target.value)} />
        </Form.Group>

        <Button variant='danger' type='submit'  onClick={handleSubmit} >
          Register
        </Button>
        <Link to={'/'}>
          <Button variant='outline-danger' style={{ display: 'inline-block', marginLeft: '10px'}}>Return to login page</Button>
        </Link>
      </Form>
    </Row>  
  )
}

RegistrationView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    birthday: propTypes.string
  }),
  onRegistered: propTypes.func.isRequired
};