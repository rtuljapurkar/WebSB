import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';

export default function venueReducer(state =initialState.venues, action) {
      switch(action.type) {
        case types.LOAD_VENUES_SUCCESS:
        {
          
             return Object.assign({}, state, {
                    data: action.data
                  });
        }
        case types.SORT_VENUES_DATA:
        if (state.sortKey === action.sortKey)
        {
          return Object.assign({}, state, {
                sortKey: action.sortKey,
                sortDesc: !state.sortDesc
              });
          }
        else
        {
            return Object.assign({}, state, {
                  sortKey: action.sortKey,
                  sortDesc: false
                });
        }
        case types.FILTER_VENUES_DATA:
            return Object.assign({}, state, {
            filterString: action.filterString.toLowerCase()
            });
         default:
          return state;
      }
}
