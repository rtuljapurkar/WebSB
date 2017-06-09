import {combineReducers} from 'redux';
import posts from './postReducer';
import session from './sessionReducer';
import venues from './venueReducer';
import teams from './teamReducer';
import amenities from './amenityReducer';
import venueDetail from './venueDetailReducer';
import favorites from './favoritesReducer';
import scores from './scoresReducer';
import pointOfInterests from './pointOfInterestReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import newPost from './newPostReducer';
import initialState from './initialState';
import { routerReducer } from 'react-router-redux';

const appReducer = combineReducers({
    routing: routerReducer,
    session: session,
    venues: venues,
    teams: teams,
    amenities: amenities,
    ajaxCallsInProgress: ajaxCallsInProgress,
    posts: posts,
    pointOfInterests: pointOfInterests,
    favorites: favorites,
    scores: scores,
    newPost: newPost,
    venueDetail: venueDetail
});

export const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT_SUCCESS') {        
        state = initialState;
    }
    return appReducer(state, action);
};
