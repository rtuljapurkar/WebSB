import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';

import HomePage from './components/Home/HomePage';
import AboutPage from './components/About/AboutPage';
import VenuesPage from './components/Venues/VenuePage';
import TeamsPage from './components/Teams/TeamPage';
import PostsPage from './components/Posts/PostsPage';
import ManagePostPage from './components/Posts/ManagePostPage';
import RegisterPage from './components/Authentication/RegisterPage';
import LogInPage from './components/Authentication/LoginPage';
import auth from './auth/authenticator';


export default (
  <Route path="/" onUpdate={() => window.scrollTo(0, 0)} component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/login" component={LogInPage} />
    <Route path="/register" component={RegisterPage} />
    <Route path="/venues" component={VenuesPage} onEnter={requireAuth}/>
    <Route path="/teams" component={TeamsPage} onEnter={requireAuth}/>
    <Route path="/posts" component={PostsPage} onEnter={requireAuth}/>
    <Route path="/posts/add/:venueId" component={ManagePostPage} onEnter={requireAuth}/>

    <Route path="/about" component={AboutPage} />
  </Route>
);

function requireAuth(nextState, replace) {
  //console.log(auth.loggedIn());
      if (!auth.loggedIn()) {
        replace({
                  pathname: '/login',
                  state: { nextPathname: nextState.location.pathname }
        });
  }
}
