import React, { useState } from 'react';
import axios from 'axios';
// Rect Bootstrap
import { Form, Card, Button, Col } from 'react-bootstrap';

  export const UpdateView = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    
    const handleUpdate = (e) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      e.preventDefault();
      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }  
      axios.put(`https://young-shelf-67619.herokuapp.com/users/${user}`, data, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'PUT',
      })
      .then(response => {
        console.log(response.data)
        alert('Saved Changes. Please Re-login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
      })
      .catch(e => {
        console.log(`Error: ${e.message}`)
      });
    }
  
    return (
      <>
       {/* Update form */}
      <Col>
      <Card>
        <Card.Body>
          <Card.Title>Update</Card.Title>

          <Form>
            <Form.Group controlId='formUsername'>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type='text'
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
                placeholder='Username'
              />
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                minLength='8'
                placeholder='Change your password'
              
              />
            </Form.Group>

            <Form.Group controlId='formEmail'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                placeholder='Change your email'
              />
            </Form.Group>

            <Form.Group controlId='formBirthday'>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type='date'
                value={birthday}
                onChange={(e) =>
                  setBirthday(e.target.value)
                }
              />
            </Form.Group>
            <Button variant='danger' type='submit' className='mt-4' onClick={handleUpdate}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </Col>
      </>
    )
  }
  


