import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadVenuesSuccess(venues) {
    //console.log("in loadVenuesSuccess");
    //console.log(venues);
  return {type: types.LOAD_VENUES_SUCCESS, venues};
}

export function loadVenues() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
        dispatch( beginAjaxCall());
        return venuesApi.getAllVenues().then(venues => {
             dispatch(loadVenuesSuccess(venues));
         }).catch(error => {
            // console.log("error getting venues");
             dispatch(ajaxCallError(error));
             throw(error);
         });


  };
}
