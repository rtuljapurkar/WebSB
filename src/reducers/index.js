import {combineReducers} from 'redux';
import posts from './postReducer';
import session from './sessionReducer';
import venues from './venueReducer';
import teams from './teamReducer';
import amenities from './amenityReducer';
import pointOfInterests from './pointOfInterestReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import initialState from './initialState';
import { routerReducer } from "react-router-redux";

const appReducer = combineReducers({
    routing: routerReducer,
    session: session,
    venues: venues,
    teams: teams,
    amenities: amenities,
    ajaxCallsInProgress: ajaxCallsInProgress,
    posts: posts,
    pointOfInterests: pointOfInterests
});

export const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT') {
        state = initialState;
    }
    return appReducer(state, action);
};
