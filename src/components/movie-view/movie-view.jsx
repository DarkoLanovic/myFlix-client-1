import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Rect Bootstrap
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.post(`https://young-shelf-67619.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {}, {
    headers: { Authorization: `Bearer ${token}`},
    method: 'POST'
  })
  .then(() => {
    alert('The movie is added your favorite movie list')
    
  })
  .catch( e => {
    console.log(e)
  });
  }

  removeFavorite() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios
      .delete(
        `https://young-shelf-67619.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'DELETE'
        }
      )
      .then(() => {
        alert('Movie was removed');
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { movie } = this.props;
    console.log(movie)
    const style = {
      width: '200px'
    }

    return (
      <Card className='mb-5'>
      <Card.Header className='flex movie-title'>
        <h1>{movie.Title}</h1>
        {/* <Link to={`/genres/${movie.Genre.Name}`}>
          <Badge bg='secondary'>{movie.Genre.Name}</Badge>
        </Link> */}
      </Card.Header>
      <Card.Body>
        <Card.Img variant='top' src={movie.ImagePath} crossOrigin='anonymous' alt={movie.Title}/>
        <Card.Subtitle as='h3' className='mt-3 text-muted'>
          {/* <Link to={`/directors/${movie.Director.Name}`}>
            Director: {movie.Director.Name}
          </Link> */}
        </Card.Subtitle>
        <Card.Text className='mt-3 mb-4'>{movie.Description}</Card.Text>
        <Button variant='danger' value={movie._id} onClick={() => this.addFavorite()}>Add to my favorite movie list</Button>
        <Button variant='outline-danger' value={movie._id} onClick={() => this.removeFavorite()} style={{ display: 'inline-block', marginLeft: '10px'}}>Remove favorite movie list</Button>
        <Link to={'/'}>
          <Button variant='outline-danger' style={{ display: 'inline-block', marginLeft: '10px'}}>Return to movie list</Button>
        </Link>
        
      </Card.Body>
    </Card>
    )
  }
}

MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string
    }),
    Director: propTypes.shape({
      Name: propTypes.string
    })
  })
};

