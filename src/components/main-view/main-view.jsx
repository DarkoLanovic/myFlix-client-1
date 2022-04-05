import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';


// import components
import MoviesList from '../movies-list/movies-list'
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import  ProfileView  from '../profile-view/profile-view';
// Rect Bootstrap
import { Row, Col, Spinner } from 'react-bootstrap';

// scss
import './main-view.scss'

// Create MainView component
class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      // this.setState({
      //   user: localStorage.getItem('user')
      // });
      this.getUser(accessToken);
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://young-shelf-67619.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //console.log(response)
      this.props.setMovies(response.data);
    })
    .catch(e => {
      console.log(e)
    });
  }

  getUser() {
    this.setState({ loading: true });
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios
      .get(`https://young-shelf-67619.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'GET'
      })
      .then(response => {
        //console.log(response)
        this.props.setUser(response.data);
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log(e);
        this.setState({ loading: false });
      });
  }

  onLoggedIn(authData) {
    //console.log(authData);
    // this.setState({
    //   user: authData.user.Username
    // });
    this.props.setUser(authData.user);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    window.location.reload();
  }


  render() {
    const { movies, user } = this.props;

    return (
      <Router>
        {this.state.loading ? (
          <div className='loading'>
          <Spinner animation='border' variant='danger' className='spinner'/>
          </div>
        ) : (
          <Row className='justify-content-md-center main-view mt-5'>

            {/* Movies -- Top page*/}
            <Route exact path='/' render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className='main-view' />
              return <MoviesList  movies={movies} />
            }} />

            {/* Register view */}
            <Route path='/register' render={() => {
              if (user) return <Redirect to='/' />
              return <Col>
              <RegistrationView onLoggedIn={user => this.onLoggedIn(user)}/>
              </Col>
            }} />

            {/* Single movie */}
            <Route path='/movies/:movieId' render={({ match, history }) => {
              console.log(movies)
              return <Col md={12} lg={8}>
              <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
            }} />

            {/* Director view */}
            <Route path='/directors/:name' render={({ match, history} ) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col> 
              if (movies.length === 0) return <div className='main-view' />
              return <Col md={12} lg={8}>
                <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            {/* Genre view */}
            <Route path='/genres/:name' render={({ match, history} ) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col> 
              if (movies.length === 0) return <div className='main-view' />
              return <Col md={12} lg={8}>
                <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            {/* User profile */}
                  <Route path='/profile' render={() => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col> 
              if (movies.length === 0) return <div className='main-view' />
              return <ProfileView movies={movies} user={user}/>
              }} />
          </Row>  
        )}
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies, 
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);