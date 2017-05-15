import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function postReducer(state =initialState.posts, action) {
     console.log("in postReducer");
     console.log(action.type);
      switch(action.type) {
        case types.LOAD_POSTS_SUCCESS:
        {
             return Object.assign({}, state, {
                data: action.data
              });
        }
        case types.SORT_POSTS_DATA:
        //debugger;
        if (state.sortKey === action.sortKey)
        {
          return Object.assign({}, state, {
                sortKey: action.sortKey,
                sortDesc: !state.sortDesc
              });
          }
          else {
            return Object.assign({}, state, {
                  sortKey: action.sortKey,
                  sortDesc: false
                });
          }
          case types.FILTER_POSTS_DATA:
              return Object.assign({}, state, {
                filterString: action.filterString.toLowerCase()
              });
          case types.ADDPOST_VENUE_LOAD:            
              return Object.assign({}, state, {
                venue: action.data
              });
          case types.CREATE_POST_SUCCESS:
              return [
                ...state,
                Object.assign({}, action.post)
              ];
         default:
          return state;
      }
}
