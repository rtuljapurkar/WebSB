import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import postsApi from '../api/postsApi';

export function sortBy (sortKey) {
  return {type: types.SORT_AMENITIES_DATA, sortKey};
}
export function loadVenueDetailSuccess (data) {
  return {type: types.VENUE_DETAIL_VENUE_SUCCESS,  data};
}

export function loadVenueDetailPostsSuccess (data) {
  return {type: types.VENUE_DETAIL_POSTS_SUCCESS,  data};
}

export function getVenueByID(ID) {
    // make async call to api
    return function(dispatch) {
          dispatch( beginAjaxCall());
          return venuesApi.getVenueByID(ID).then(data => {
               dispatch(loadVenueDetailSuccess(data));
           }).catch(error => {
               dispatch(ajaxCallError(error));
               throw(error);
           });
       };
   }

export function getAllPosts(venueID) {
      return function(dispatch) {
            dispatch( beginAjaxCall());
            return postsApi.getVenuePosts(venueID).then(data => {
                    console.log(data);
                     postsApi.getAmenityPosts(venueID).then(amenityPostData => {
                            console.log(amenityPostData);
                                data = data.concat(amenityPostData);
                                 postsApi.getPOIPosts(venueID).then(poiPostData => {
                                     console.log(poiPostData);
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
