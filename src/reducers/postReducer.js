import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';

export default function postReducer(state =initialState.posts, action) {
     console.log("in postReducer");
     //console.log(action);
      switch(action.type) {
        case types.LOAD_POSTS_SUCCESS:
        {
            //console.log("in LOAD_POSTS_SUCCESS");
            return action.posts;
        }
        default:
          return state;
      }
}
