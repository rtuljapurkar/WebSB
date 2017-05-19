import * as types from './actionTypes';
import postsApi from '../api/postsApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

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


export function loadPosts() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
        dispatch( beginAjaxCall());
        return postsApi.getAllPosts().then(data => {
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
