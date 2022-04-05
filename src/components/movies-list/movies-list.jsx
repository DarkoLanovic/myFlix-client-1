import React from 'react';

// Redux
import { connect } from 'react-redux'

// import components
import VisibilityFilterInput from '../visibility-filter-input//visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

// Rect Bootstrap
import { Col } from 'react-bootstrap';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return  { visibilityFilter };
}

function MoviesList(props) {
  const { movies, visibilityFilter} = props;
  let filteredMovies = movies;

  if(visibilityFilter !== '') {
    filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className='main-view' />
  return <>
      <Col md={12} className='mb-4'>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map(movie => (
        <Col xs='auto' className='justify-content-md-center mb-5' key={movie._id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </>;
}

export default connect(mapStateToProps)(MoviesList);
