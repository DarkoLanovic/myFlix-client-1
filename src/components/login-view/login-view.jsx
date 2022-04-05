import React, { useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Rect Bootstrap
import { Row, Form, Button } from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://young-shelf-67619.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data)
    })
    .catch(e => {
      console.log(e.response.data)
      console.log('No user found')
    });
  };

  return (
    <Row className='login-form justify-content-md-center mt-5' >
      <h1 style={{textAlign: 'center'}}> &#127916; myFlix Login Page &#127909;</h1>
      <Form style={{ width: '30rem' }} className='mb-3'>
        <Form.Group className='mb-3 mt-3' controlId='formUsername'>
          <Form.Label>*Username:</Form.Label>
          <Form.Control type='text' onChange={e => setUsername(e.target.value)}  placeholder='Please enter your username' required />
        </Form.Group>

        <Form.Group className='mb-4' controlId='formPassword'>
          <Form.Label>*Password:</Form.Label>
          <Form.Control type='password' onChange={e => setPassword(e.target.value)} placeholder='Please enter your password' required />
        </Form.Group>

        <Button variant='danger' type='submit' onClick={handleSubmit} >Login</Button>
      </Form>
      <div>
      <hr></hr>
      <h3 style={{textAlign: 'center'}}>Do not have myFlix account?</h3>
      <Link to={'/register'} style={{textDecoration: 'none'}}>
        <Button variant='outline-danger' style={{width: '20rem', display: 'block', margin: '30px auto'}}>Create myFlix account</Button>
      </Link>
      </div>
      
    </Row>
  )
}

LoginView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string,
    password: propTypes.string,
  }),
  onLoggedIn: propTypes.func.isRequired
};