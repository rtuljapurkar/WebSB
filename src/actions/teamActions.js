import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadTeamsSuccess(teams) {
  return {type: types.LOAD_TEAMS_SUCCESS, teams};
}

export function loadTeams() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
        dispatch( beginAjaxCall());
        return venuesApi.getAllTeams().then(teams => {
             dispatch(loadTeamsSuccess(teams));
         }).catch(error => {            
             dispatch(ajaxCallError(error));
             throw(error);
         });


  };
}
