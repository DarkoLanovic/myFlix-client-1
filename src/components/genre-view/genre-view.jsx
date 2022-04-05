import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Rect Bootstrap
import { Card, Button } from 'react-bootstrap';

export function GenreView(props) {

  const { genre, onBackClick } = props;

  return (
    <Card className='mb-5'>
    <Card.Header>
      <h1>{genre.Name}</h1>
    </Card.Header>
    <Card.Body>
      <Card.Text className='mb-4'>{genre.Description}</Card.Text>
      <Button variant="danger" onClick={() => onBackClick()}>Return to the movie</Button>
      <Link to={'/'}>
      <Button variant="outline-danger" style={{ display: 'inline-block', marginLeft: '10px'}}>Go to movie list</Button>
      </Link>
      
    </Card.Body>
  </Card>
  )
}

GenreView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Description: propTypes.string
  })
};
