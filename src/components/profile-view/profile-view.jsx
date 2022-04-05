
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Rect Bootstrap
import { Button, Row, Col, Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

// import components
import { UpdateView } from './update-view';


class ProfileView extends React.Component {

  removeFavorite(id) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios
      .delete(
        `https://young-shelf-67619.herokuapp.com/users/${user}/movies/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'DELETE'
        },
      )
      .then(() => {
        alert('The movie was removed');
        this.componentDidMount() 
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleDeleteUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://young-shelf-67619.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'DELETE'
      })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/register`, '_self');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {

    const { movies, user } = this.props;

    return (
      <Container>
        <Row>
{/* User info */}
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>My Profile</Card.Title>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                <ListGroupItem>Username: {user.Username} </ListGroupItem>
                <ListGroupItem>Email: {user.Email} </ListGroupItem>
                <ListGroupItem>Birthday: {user.Birthday} </ListGroupItem>
                <ListGroupItem>
                  <Button
                  variant='outline-secondary'
                  onClick={() => this.handleDeleteUser()}
                  >Delete Account</Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

{/* Update form */}
          
          <UpdateView />
        </Row>

{/* Favorite movie */}
        <Card className='mt-4 mb-5'>
          <Row>
            <Col xs={12} className='p-4'>
              <h4 style={{textAlign: 'center'}}>Favorite Movies</h4>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card.Body>
                {user.FavoriteMovies?.length === 0 && (
                  <div style={{textAlign: 'center'}}>
                    You have no favorite movies.
                  </div>
                )}
                <Row className='favorites-movies justify-content-md-center mb-4'>
                  {user.FavoriteMovies?.length > 0 &&
                    movies.map(movie => {
                      if (
                        movie._id ===
                        user.FavoriteMovies.find(fav => fav === movie._id)
                      ) {
                        return (
                            <Card
                              className='favorites-item card-content'
                              style={{ width: '19rem' }}
                              key={movie._id}
                            >
                              <Card.Body>
                                <Link to={`/movies/${movie._id}`}>
                                  <Card.Img
                                  className='movieCard'
                                  variant='top'
                                  src={movie.ImagePath}
                                  crossOrigin='anonymous'
                                  alt={movie.Title}
                                  style={{height: '18rem'}}
                                  />
                                  <Card.Title className='movie-card-title mt-2'>{movie.Title}</Card.Title>
                                </Link>
                                <Button
                                  className='profile-button remove-favorite mt-3'
                                  variant='outline-danger'
                                  value={movie._id}
                                  onClick={() => this.removeFavorite(movie._id)}
                                >
                                  Remove from my favorite
                                </Button>
                              </Card.Body>
                            </Card>
                        );
                      }
                    })}
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default connect()(ProfileView);