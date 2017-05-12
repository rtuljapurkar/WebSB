import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function venueReducer(state =initialState.venues, action) {
     console.log("in venueReducer");
     console.log(action.type);
      switch(action.type) {
        case types.LOAD_VENUES_SUCCESS:
        {
            //console.log("in LOAD_VENUES_SUCCESS");
            //console.log(action.venues);
            return action.venues;
        }        
        default:
          return state;
      }
}
