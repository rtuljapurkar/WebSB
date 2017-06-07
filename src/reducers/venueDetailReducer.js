import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function venueDetailReducer(state = initialState.venueDetail, action) {
      switch(action.type) {
          case types.VENUE_DETAIL_POSTS_SUCCESS:
                  return Object.assign({}, state, {
                    venueRelatedPosts: action.data
                  });
          case types.VENUE_DETAIL_VENUE_SUCCESS:
                  return Object.assign({}, state, {
                    venue: action.data
                  });
         default:
          return state;
      }
}
