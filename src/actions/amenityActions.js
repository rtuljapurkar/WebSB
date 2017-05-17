import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAmenitiesSuccess(data) {
  return {type: types.LOAD_AMENITIES_SUCCESS, data};
}
export function filterBy (filterString) {
  return {type: types.FILTER_AMENITIES_DATA, filterString};
}
export function sortBy (sortKey) {
  return {type: types.SORT_AMENITIES_DATA, sortKey};
}
export function loadAmenitiesVenuesSuccess (data) {
  return {type: types.AMENITIES_VENUE_LOAD_SUCCESS,  data};
}



 export function loadAmenities(venueId) {
         return function(dispatch) {
         dispatch( beginAjaxCall());
         return venuesApi.getAllAmenities(venueId).then(data => {
              dispatch(loadAmenitiesSuccess(data));
          }).catch(error => {
             // console.log("error getting Amenities");
              dispatch(ajaxCallError(error));
              throw(error);
          });
      };
  }

  export function getVenueByID(ID) {
    // make async call to api, handle promise, dispatch action when promise is resolved
//    debugger;
    return function(dispatch) {
          dispatch( beginAjaxCall());
          return venuesApi.getVenueByID(ID).then(data => {
               dispatch(loadAmenitiesVenuesSuccess(data));
           }).catch(error => {               
               dispatch(ajaxCallError(error));
               throw(error);
           });
       };
   }
