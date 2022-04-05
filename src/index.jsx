// Import module
import React from 'react';
import ReactDom from 'react-dom';

// Rect Bootstrap
import Container from 'react-bootstrap/Container';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

// Import components
import MainView from './components/main-view/main-view';
import { HeaderSection } from './components/header-section/header-section';
// Import scss
import './index.scss';

const myFlixStore = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {

  render() {
    return (
      <Provider store={myFlixStore}>
        <HeaderSection />
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDom.render(React.createElement(MyFlixApplication), container);