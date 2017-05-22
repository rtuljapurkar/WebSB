import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function scoresReducer(state =initialState.scores, action) {
      switch(action.type) {
        case types.LOAD_SCORES_SUCCESS:
        {
            //  return Object.assign({}, state, {
            //     data: action.data
            //   });
            return state;
        }
        default:
          return state;
      }
}
