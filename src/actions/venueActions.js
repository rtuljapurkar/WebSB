import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, beginVenuesAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadVenuesSuccess(data) {
  return {type: types.LOAD_VENUESMAIN_SUCCESS, data};
}

export function filterBy (filterString) {
  return {type: types.FILTER_VENUES_DATA, filterString};
}

export function sortBy (sortKey) {
  return {type: types.SORT_VENUES_DATA, sortKey};
}

export function loadVenuesMain() {
  // make async call to api
  return function(dispatch) {
        dispatch( beginVenuesAjaxCall());
        return venuesApi.getAllVenues().then(data => {
             dispatch(loadVenuesSuccess(data));
         }).catch(error => {            
             dispatch(ajaxCallError(error));
             throw(error);
         });
     };
 }
