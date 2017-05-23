import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function teamReducer(state =initialState, action) {
      //console.log("team reducer");
      switch(action.type) {
        case types.LOAD_TEAMS_SUCCESS:
        {
            return action.teams;
        }
        // case "@@router/LOCATION_CHANGE":
        //   return state;
        default:
          return state;
      }
}
