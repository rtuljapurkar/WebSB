import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadVenuesSuccess(data) {
    //console.log("in loadVenuesSuccess");
    //console.log(venues);

  return {type: types.LOAD_VENUES_SUCCESS, data};
}

export function filterBy (filterString) {
  return {
    type: types.FILTER_VENUES_DATA,
    filterString
  }
}

export function sortBy (sortKey) {
  return {
    type: types.SORT_VENUES_DATA,
    sortKey
  }
}
export function loadVenues() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
        dispatch( beginAjaxCall());
        return venuesApi.getAllVenues().then(data => {
             dispatch(loadVenuesSuccess(data));
         }).catch(error => {
            // console.log("error getting venues");
             dispatch(ajaxCallError(error));
             throw(error);
         });


  };
}
