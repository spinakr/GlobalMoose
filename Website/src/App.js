import 'whatwg-fetch'; // Native fetch polyfill
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import React, { Component } from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppLayoutContainer from './components/navigation/appLayoutContainer';
import wines from './modules/wines';
import addWineForm from './modules/addWineForm';
import stats from './modules/stats';
import facebook from './modules/facebook';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  combineReducers({ wines, addWineForm, stats, facebook }),
  composeEnhancers(applyMiddleware(thunk)),
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppLayoutContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
