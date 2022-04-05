import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Rect Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    console.log(movie)

    return (
      <Card style={{ width: '18rem', height: '41rem'}}>
        <Link to={`/movies/${movie._id}`}>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin='anonymous' style={{height: '18rem'}} />
        </Link>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text style={{height: '15rem', textOverflow: 'ellipsis', overflow: 'hidden'}}>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="danger">More details</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string
  }).isRequired,
  //onMovieClick: propTypes.func.isRequired
};