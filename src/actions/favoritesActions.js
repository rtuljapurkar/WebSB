import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, beginFavoritesAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadFavoritesSuccess(data) {
  return {type: types.LOAD_FAVORITES_SUCCESS, data};
}
export function loadVenuesSuccess(data) {
  return {type: types.LOAD_VENUES_SUCCESS, data};
}
export function loadFavorites() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
        dispatch( beginFavoritesAjaxCall());
        return venuesApi.getFavorites().then(data => {
             dispatch(loadFavoritesSuccess(data));
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
