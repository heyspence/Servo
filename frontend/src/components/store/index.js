import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import errorsReducer from './errors';
import vendorsReducer from './vendor';
import bookingsReducer from './bookings';
import reviewsReducer from './reviews';
import ordersReducer from './orders';
import imagesReducer from './images';
import eventsReducer from './events';
import usersReducer from './users';
import uiReducer from "./ui";

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  vendors: vendorsReducer,
  bookings: bookingsReducer,
  reviews: reviewsReducer,
  orders: ordersReducer,
  images: imagesReducer,
  events: eventsReducer,
  users: usersReducer,
  ui: uiReducer
});

let enhancer;

if (process.env.NODE_ENV !== 'development') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

