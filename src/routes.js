import React from 'react';
import { Route, IndexRoute, browserHistory, Router } from 'react-router';
import App from './components/app';

import HomePage from './components/Home/HomePage';
import MasterPage from './components/MasterPage';
import AboutPage from './components/About/AboutPage';
import FavoritesPage from './components/Favorites/FavoritesPage';
import ScoresPage from './components/Scores/ScoresPage';
import VenuesPage from './components/Venues/VenuePage';
import AmenitiesPage from './components/Venues/AmenitiesPage';
import PointOfInterestPage from './components/Venues/PointOfInterestPage';
import TeamsList from './components/Teams/TeamList';
import PostsPage from './components/Posts/PostsPage';
import ManagePostPage from './components/Posts/ManagePostPage';
import RegisterPage from './components/Authentication/RegisterPage';
import LoginPage from './components/Authentication/LoginPage';
import auth from './auth/authenticator';


export default (
  <Router history={history}>
  <Route path="/" component={MasterPage}>
    <IndexRoute component={HomePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/home" component={HomePage} />
    <Route path="/register" component={RegisterPage} />
    <Route path="/venues" component={VenuesPage} onEnter={requireAuth}/>
    <Route path="/teams" component={TeamsList} onEnter={requireAuth}/>
    <Route path="/posts" component={PostsPage} onEnter={requireAuth}/>
    <Route path="/favorites" component={FavoritesPage} onEnter={requireAuth}/>
    <Route path="/scores" component={ScoresPage} onEnter={requireAuth}/>
    <Route path="/posts/add/:venueId" component={ManagePostPage} onEnter={requireAuth}/>
    <Route path="/posts/amenities/add/:amenityId" component={ManagePostPage} onEnter={requireAuth}/>
    <Route path="/amenities/:venueId" component={AmenitiesPage} onEnter={requireAuth}/>
    <Route path="/poi/:venueId" component={PointOfInterestPage} onEnter={requireAuth}/>

    <Route path="/about" component={AboutPage} />
  </Route>
  </Router>
);

function requireAuth(nextState, replace) {
      if (!auth.loggedIn()) {
        replace({
                  pathname: '/login',
                  state: { nextPathname: nextState.location.pathname }
        });
  }
}
