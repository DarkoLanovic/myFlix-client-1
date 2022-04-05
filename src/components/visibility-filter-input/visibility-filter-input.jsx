import React from 'react';

// Redux
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';

// Rect Bootstrap
import { Form } from 'react-bootstrap';


function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.VisibilityFilter}
    placeholder='Search movie...'
  />;
}

export default connect(
  null,
  { setFilter },
)(VisibilityFilterInput);