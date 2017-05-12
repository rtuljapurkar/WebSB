import {combineReducers} from 'redux';
import posts from './postReducer';
import session from './sessionReducer';
import venues from './venueReducer';
import teams from './teamReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import initialState from './initialState';
import { routerReducer } from "react-router-redux";

const appReducer = combineReducers({
    routing: routerReducer,
    session: session,
    venues: venues,
    teams: teams,
    ajaxCallsInProgress: ajaxCallsInProgress,
    posts: posts
});

export const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT') {
        state = initialState;
    }
    return appReducer(state, action);
};
