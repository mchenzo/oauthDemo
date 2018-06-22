//if no relative path is provided, webpack assumes we are looking for an npm module
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));



//provider tracks store changes, informs child elements that new state available
//updates them
ReactDOM.render(
	<Provider store = { store } ><App /></Provider>, 
	document.querySelector('#root')
);