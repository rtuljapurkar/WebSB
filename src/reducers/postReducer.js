import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function postReducer(state = initialState.posts, action) {
      switch(action.type) {
        case types.LOAD_POSTS_SUCCESS:
        {
             return Object.assign({}, state, {data: action.data});
        }
        case types.SORT_POSTS_DATA:
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
           case types.LOAD_POSTVENUES_SUCCESS:
                  return Object.assign({}, state, {
                    venues: action.data
                  });
          case types.LOAD_POSTUSERS_SUCCESS:
                  {
                      return Object.assign({}, state, {
                              users: action.data
                            });
                  }
         default:
          return state;
      }
}
