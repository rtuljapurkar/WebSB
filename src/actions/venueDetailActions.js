import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, beginVenueDetailsAjaxCall, ajaxCallError} from './ajaxStatusActions';
import postsApi from '../api/postsApi';
import sessionApi from '../api/sessionApi';

export function sortBy (sortKey) {
  return {type: types.SORT_AMENITIES_DATA, sortKey};
}
export function loadVenueDetailSuccess (data) {
  return {type: types.VENUE_DETAIL_VENUE_SUCCESS,  data};
}

export function loadVenueDetailPostsSuccess (data) {
  return {type: types.VENUE_DETAIL_POSTS_SUCCESS,  data};
}
export function loadVenueDetailPOISuccess (data) {
  return {type: types.VENUE_DETAIL_POI_SUCCESS,  data};
}
export function loadVenueDetailAmenitiesSuccess (data) {
  return {type: types.VENUE_DETAIL_AMENITIES_SUCCESS,  data};
}
export function loadVenueDetailUsersSuccess (data) {
  return {type: types.VENUE_DETAIL_USERS_SUCCESS,  data};
}

export function getVenueByID(ID) {
    // make async call to api
    return function(dispatch) {
          dispatch( beginVenueDetailsAjaxCall());
          return venuesApi.getVenueByID(ID).then(data => {
               dispatch(loadVenueDetailSuccess(data));
           }).catch(error => {
               dispatch(ajaxCallError(error));
               throw(error);
           });
       };
   }

export function getAllPostsByVenue(venueID) {
      return function(dispatch) {
            dispatch( beginAjaxCall());
            return postsApi.getVenuePostsByVenue(venueID).then(data => {
                     postsApi.getAmenityPosts(venueID).then(amenityPostData => {
                                data = data.concat(amenityPostData);
                                 postsApi.getPOIPosts(venueID).then(poiPostData => {
                                         data = data.concat(poiPostData);
                                         dispatch(loadVenueDetailPostsSuccess(data));
                                       }).catch(error => {
                                           dispatch(ajaxCallError(error));
                                           throw(error);
                                       });
                               }).catch(error => {
                                   dispatch(ajaxCallError(error));
                                   throw(error);
                               });
             }).catch(error => {
                 dispatch(ajaxCallError(error));
                 throw(error);
             });
         };
     }

 export function getAmenitiesByVenue(venueId) {
         return function(dispatch) {
         dispatch( beginAjaxCall());
         return venuesApi.getAllAmenities(venueId).then(data => {
              dispatch(loadVenueDetailAmenitiesSuccess(data));
          }).catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
      };
  }
  export function getPointOfInterestsByVenue(venueId) {
          return function(dispatch) {
          dispatch( beginAjaxCall());
          return venuesApi.getPointOfInterests(venueId).then(data => {
               dispatch(loadVenueDetailPOISuccess(data));
           }).catch(error => {
               dispatch(ajaxCallError(error));
               throw(error);
           });
       };
   }
   export function getAllUsers() {
     // make async call to api
     return function(dispatch) {
           dispatch( beginAjaxCall());
           return sessionApi.getAllUsers().then(data => {
                dispatch(loadVenueDetailUsersSuccess(data));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
        };
    }
