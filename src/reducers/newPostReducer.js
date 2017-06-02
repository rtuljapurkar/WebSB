import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function postReducer(state = initialState.newPost, action) {
      switch(action.type) {
          case types.ADDPOST_VENUE_LOAD:
                  return Object.assign({}, state, {
                    venue: action.data
                  });
          case types.ADDPOST_AMENITY_LOAD:
                console.log("here");
                console.log(action.data);
                  return Object.assign({}, state, {
                    amenity: action.data,
                    venue: action.data.venue
                  });
          case types.CREATE_POST_SUCCESS:
              return state;
         default:
          return state;
      }
}
