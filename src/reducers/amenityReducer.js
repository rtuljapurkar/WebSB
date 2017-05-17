import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function amenityReducer(state =initialState.amenities, action) {
      switch(action.type) {
        case types.LOAD_AMENITIES_SUCCESS:
        {
             return Object.assign({}, state, {
                data: action.data
              });
        }
        case types.SORT_AMENITIES_DATA:
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
        case types.FILTER_AMENITIES_DATA:
            return Object.assign({}, state, {
                filterString: action.filterString.toLowerCase()
            });
        case types.AMENITIES_VENUE_LOAD_SUCCESS:
            return Object.assign({}, state, {
              venue: action.data
            });
        default:
          return state;
      }
}
