import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, beginScoresAjaxCall, ajaxCallError, ajaxScoresCallError} from './ajaxStatusActions';

export function loadScoresSuccess(data) {
  return {type: types.LOAD_SCORES_SUCCESS, data};
}
export function loadScoresAvailableDatesSuccess(data) {
  return {type: types.LOAD_SCORES_AVAILABLE_DATES_SUCCESS, data};
}
export function changeSelectedDateSuccess(data) {
  return {type: types.CHANGE_SCORE_SELECTED_DATE_SUCCESS, data};
}

export function loadScores() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
        dispatch( beginScoresAjaxCall());
        return venuesApi.getScores().then(data => {
             dispatch(loadScoresSuccess(data));
         }).catch(error => {
             dispatch(ajaxScoresCallError(error));
             throw(error);
         });
     };
 }

  export function loadScoresAvailableDates() {
    return function(dispatch) {
          dispatch( beginAjaxCall());
          return venuesApi.getScoresAvailableDates().then(data => {
               dispatch(loadScoresAvailableDatesSuccess(data));
           }).catch(error => {
               dispatch(ajaxScoresCallError(error));
               throw(error);
           });
       };
   }

   export function changeSelectedDate(datestring) {
     return function(dispatch) {
          dispatch(changeSelectedDateSuccess(datestring));

        };
    }
