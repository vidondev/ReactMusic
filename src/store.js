import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore  } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';

export const history = createBrowserHistory()

const store = createStore(
  createRootReducer(history), // root reducer with router state
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk
    ),
  ),
);

export default store;