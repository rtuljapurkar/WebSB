import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, beginPOIAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadPointOfInterestSuccess(data) {
  return {type: types.LOAD_POI_SUCCESS, data};
}
export function filterBy (filterString) {
  return {type: types.FILTER_POI_DATA, filterString};
}
export function sortBy (sortKey) {
  return {type: types.SORT_POI_DATA, sortKey};
}
export function loadPOIVenuesSuccess (data) {
  return {type: types.POI_VENUE_LOAD_SUCCESS,  data};
}

 export function loadPointOfInterests(venueId) {
         return function(dispatch) {
         dispatch( beginPOIAjaxCall());
         return venuesApi.getPointOfInterests(venueId).then(data => {
              dispatch(loadPointOfInterestSuccess(data));
          }).catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
      };
  }

  export function getVenueByID(ID) {
    // make async call to api
    return function(dispatch) {
          dispatch( beginAjaxCall());
          return venuesApi.getVenueByID(ID).then(data => {
               dispatch(loadPOIVenuesSuccess(data));
           }).catch(error => {
               dispatch(ajaxCallError(error));
               throw(error);
           });
       };
   }
