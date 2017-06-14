import * as types from './actionTypes';

export function beginAjaxCall() {
    return {type: types.BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
  return {type: types.AJAX_CALL_ERROR};
}

export function beginPostsAjaxCall() {
  return {type: types.BEGIN_POSTS_AJAX_CALL};
}
export function beginVenuesAjaxCall() {
  return {type: types.BEGIN_VENUES_AJAX_CALL};
}
export function beginAmenitiesAjaxCall() {
  return {type: types.BEGIN_AMENITIES_AJAX_CALL};
}
export function beginPOIAjaxCall() {
  return {type: types.BEGIN_POI_AJAX_CALL};
}
export function beginFavoritesAjaxCall() {
  return {type: types.BEGIN_FAVORITES_AJAX_CALL};
}
export function beginScoresAjaxCall() {
  return {type: types.BEGIN_SCORES_AJAX_CALL};
}
export function beginVenueDetailsAjaxCall() {
  return {type: types.BEGIN_VENUEDETAILS_AJAX_CALL};
}
export function ajaxScoresCallError() {
  return {type: types.AJAX_SCORES_CALL_ERROR};
}
export function ajaxFavoritesCallError() {
  return {type: types.AJAX_FAVORITES_CALL_ERROR};
}
