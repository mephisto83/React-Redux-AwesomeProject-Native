import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import Details from './components/Details'
import EditJob from './components/EditJob'
import BlendedBatch from './components/BlendedBatch'
import configureStore from './store/configureStore'

import { Route, Link, IndexRoute } from 'react-router';
import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter,
  pushState
} from 'redux-router';

const store = configureStore()

render(
  <Provider store={store}>
    <ReduxRouter>
      <Route path="/" component={App}>
        <IndexRoute component={BlendedBatch}></IndexRoute>
        <Route path="/details/:id" component={Details}></Route>
        <Route path="/newjob" component={EditJob}></Route>
      </Route>
    </ReduxRouter>
  </Provider>,
  document.getElementById('root')
)
