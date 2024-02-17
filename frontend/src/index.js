import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import { restoreSession } from './components/store/session';
import configureStore from "./components/store";
import { getCart } from './components/store/cart';

const store = configureStore();
const container = document.getElementById('root');
const root = createRoot(container);
const selectCurrentUserId = state => state.session.user ? state.session.user.id : null;

if(true){
    store.dispatch(restoreSession())
    .then(() => {
        const userId = selectCurrentUserId(store.getState());
        if(userId){
            return store.dispatch(getCart(userId))
        }
    })
    .then(()=>{root.render(<App store={store} />);})
}else{
    root.render(<App store={store} />);
}
