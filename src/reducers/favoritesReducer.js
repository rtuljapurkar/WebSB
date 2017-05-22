import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function favoritesReducer(state =initialState.favorites, action) {
      switch(action.type) {
        case types.LOAD_FAVORITES_SUCCESS:
        {
             return Object.assign({}, state, {
                data: action.data
              });
        }
        default:
          return state;
      }
}
