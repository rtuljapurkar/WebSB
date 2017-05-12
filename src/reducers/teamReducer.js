import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function teamReducer(state =initialState.teams, action) {
     console.log("in teamReducer");
      console.log(action.type);
      switch(action.type) {
        case types.LOAD_TEAMS_SUCCESS:
        {
            //console.log("in LOAD_TEAMS_SUCCESS");
            return action.teams;
        }
        default:
          return state;
      }
}
