import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadScoresSuccess(data) {
  return {type: types.LOAD_SCORES_SUCCESS, data};
}
export function loadVenuesSuccess(data) {
  return {type: types.LOAD_VENUES_SUCCESS, data};
}
export function loadScores() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
        dispatch( beginAjaxCall());
        return venuesApi.getScores().then(data => {
             dispatch(loadscoresSuccess(data));
         }).catch(error => {
             dispatch(ajaxCallError(error));
             throw(error);
         });
     };
 }

 export function loadVenues() {
   // make async call to api
   return function(dispatch) {
         dispatch( beginAjaxCall());
         return venuesApi.getAllVenues().then(data => {
              dispatch(loadVenuesSuccess(data));
          }).catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
      };
  }
