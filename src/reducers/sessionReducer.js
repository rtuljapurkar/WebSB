import * as types from '../actions/actionTypes';
import {browserHistory} from 'react-router';
import initialState from './initialState';

export default function sessionReducer(state = initialState.session, action) {
  switch(action.type) {

    case types.LOG_IN_SUCCESS:
    {
     // browserHistory.push('/venues');
      return !!sessionStorage.jwt;
}
    case types.LOG_IN_FAILED:
        return !!sessionStorage.jwt;

    case types.LOG_OUT:
      browserHistory.push('/');
      return !!sessionStorage.jwt;

    default:
      return state;
  }
}
