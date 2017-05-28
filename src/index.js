/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';//Webpack can import CSS files too!
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './styles/_bootswatch.scss';
// import './styles/_variables.scss'
// import "./styles/unitedbootstrap.min.css";
import '../node_modules/toastr/build/toastr.min.css';
import initialState from './reducers/initialState';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

//store.dispatch(loadVenues());

render(
    <Provider store={store}>
        <Router  history={history} routes={routes} />
    </Provider>,    document.getElementById('app'));
