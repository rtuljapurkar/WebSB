import React from 'react';
import { Route, IndexRoute, browserHistory, Router } from 'react-router';
import App from './components/app';

import HomePage from './components/Home/HomePage';
import MasterPage from './components/MasterPage';
import AboutPage from './components/About/AboutPage';
import TermsPage from './components/Terms/TermsPage';
import HelpPage from './components/Help/HelpPage';
import FavoritesPage from './components/Favorites/FavoritesPage';
import ScoresPage from './components/Scores/ScoresPage';
import VenuesPage from './components/Venues/VenuePage';
import VenueDetailPage from './components/Venues/VenueDetailPage';
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
    <Route path="/login" title="Login"  component={LoginPage} />
    <Route path="/home" title="Home" component={PostsPage} onEnter={requireAuth}/>
    <Route path="/register" title="Register" component={RegisterPage} />
    <Route path="/venues" title="Venues" component={VenuesPage} onEnter={requireAuth}/>
    <Route path="/venues/:venueId" component={VenueDetailPage} onEnter={requireAuth}/>
    <Route path="/teams" title="Teams" component={TeamsList} onEnter={requireAuth}/>
    <Route path="/posts"  title="Posts"  component={PostsPage} onEnter={requireAuth}/>
    <Route path="/favorites" title="Favorites" component={FavoritesPage} onEnter={requireAuth}/>
    <Route path="/scores" title="Scores" component={ScoresPage} onEnter={requireAuth}/>
    <Route path="/posts/add/:venueId" title="Manage Venue Post" component={ManagePostPage} onEnter={requireAuth}/>
    <Route path="/posts/amenities/add/:amenityId" title="Manage Amenity Post" component={ManagePostPage} onEnter={requireAuth}/>
    <Route path="/posts/poi/add/:poiId" title="Manage POI Post" component={ManagePostPage} onEnter={requireAuth}/>
    <Route path="/amenities/:venueId" title="Amenities" component={AmenitiesPage} onEnter={requireAuth}/>
    <Route path="/poi/:venueId" title="Point Of Interests" component={PointOfInterestPage} onEnter={requireAuth}/>
    <Route path="/about" title="About StadiumBee"  component={AboutPage} />
    <Route path="/help" title="Help"  component={HelpPage} />
    <Route path="/terms" title="Terms"  component={TermsPage} />
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
