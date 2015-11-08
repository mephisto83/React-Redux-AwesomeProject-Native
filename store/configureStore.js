import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

const storeEnhancers = [];

let combinedCreateStore = compose(...storeEnhancers)(createStore);

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(combinedCreateStore)

const combinedReducer = combineReducers(Object.assign({
}, reducers))

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(combinedReducer, initialState);
  return store
}
