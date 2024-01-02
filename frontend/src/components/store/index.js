import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import errorsReducer from './errors';
import vendorsReducer from './vendor';
import menuItemsReducer from './menuItems';
import cartReducer from './cart';
import reviewsReducer from './reviews';
import ordersReducer from './orders';
import imagesReducer from './images';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  vendors: vendorsReducer,
  menuItems: menuItemsReducer,
  cart: cartReducer,
  reviews: reviewsReducer,
  orders: ordersReducer,
  images: imagesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'development') {
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

