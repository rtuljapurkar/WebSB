import * as types from './actionTypes';
import postsApi from '../api/postsApi';
import venuesApi from '../api/venuesApi';
import sessionApi from '../api/sessionApi';
import {beginAjaxCall, beginPostsAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadPostsSuccess(data) {
  return {type: types.LOAD_POSTS_SUCCESS, data};
}
export function filterBy (filterString) {
  return {type: types.FILTER_POSTS_DATA, filterString};
}
export function sortBy (sortKey) {
  return {type: types.SORT_POSTS_DATA,  sortKey};
}

export function addPostVenueLoadSuccess (data) {
  return {type: types.ADDPOST_VENUE_LOAD,  data};
}
export function createPostSuccess(post) {
  return {type: types.CREATE_POST_SUCCESS, post};
}
export function updatePostSuccess(post) {
  return {type: types.UPDATE_POST_SUCCESS, post};
}
export function loadVenuesSuccess(data) {
  return {type: types.LOAD_POSTVENUES_SUCCESS, data};
}
export function loadUsersSuccess(data) {
  return {type: types.LOAD_POSTUSERS_SUCCESS, data};
}
export function addPostAmenityLoadSuccess(data) {
  return {type: types.ADDPOST_AMENITY_LOAD, data};
}
export function addPostPOILoadSuccess(data) {
  return {type: types.ADDPOST_POI_LOAD, data};
}

export function loadVenuePosts() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
        dispatch(beginPostsAjaxCall());
        return postsApi.getVenuePosts().then(data => {
             dispatch(loadPostsSuccess(data));
         }).catch(error => {
             dispatch(ajaxCallError(error));
             throw(error);
         });
     };
 }

 export function addPostVenueLoad(ID) {
   // make async call to api, handle promise, dispatch action when promise is resolved
   return function(dispatch) {
         dispatch( beginAjaxCall());
         return postsApi.getVenueByID(ID).then(data => {
              dispatch(addPostVenueLoadSuccess(data));
          }).catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
      };
  }

  export function addPostPOILoad(ID) {
     return function(dispatch) {
           dispatch( beginAjaxCall());
           return postsApi.getPOIByID(ID).then(data => {
                     if(data.VenueID > 0){
                        postsApi.getVenueByID(data.VenueID).then(venueData => {
                                data.venue = venueData;
                                dispatch(addPostPOILoadSuccess(data));
                              }).catch(error => {
                                  dispatch(ajaxCallError(error));
                                  throw(error);
                              });
                     }
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
        };
    }

  export function addPostAmenityLoad(ID) {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return function(dispatch) {
          dispatch( beginAjaxCall());
          return postsApi.getAmenityByID(ID).then(data => {
                    if(data.VenueID > 0){
                       postsApi.getVenueByID(data.VenueID).then(venueData => {
                               data.venue = venueData;
                               dispatch(addPostAmenityLoadSuccess(data));
                             }).catch(error => {
                                 dispatch(ajaxCallError(error));
                                 throw(error);
                             });
                    }
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

   export function loadUsers() {
     // make async call to api
     return function(dispatch) {
           dispatch( beginAjaxCall());
           return sessionApi.getAllUsers().then(data => {
                dispatch(loadUsersSuccess(data));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
        };
    }

  export function savePost(post) {
    return function (dispatch, getState) {
      dispatch(beginAjaxCall());
      return postsApi.savePost(post).then(post => {
          dispatch(createPostSuccess(post));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
    };
  }
