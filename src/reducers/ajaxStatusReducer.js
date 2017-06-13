import * as types from '../actions/actionTypes';
import initialState from './initialState';

// function actionTypeEndsInSuccess(type) {
//   return type.substring(type.length - 8) == '_SUCCESS';
// }

// function actionTypeBeginCheck(type){
//     return  (type == types.BEGIN_POSTS_AJAX_CALL
//                     || type == types.BEGIN_TEAMS_AJAX_CALL
//                     || type == types.BEGIN_VENUES_AJAX_CALL
//                     || type == types.BEGIN_AMENITIES_AJAX_CALL
//                     || type == types.BEGIN_POI_AJAX_CALL
//                     || type == types.BEGIN_FAVORITES_AJAX_CALL
//                     || type == types.BEGIN_SCORES_AJAX_CALL
//             );
// }
//
// function actionTypeEndCheck(type){
//     return  (type == types.LOAD_POSTS_SUCCESS
//                 || type == types.LOAD_VENUESMAIN_SUCCESS
//                 || type == types.LOAD_AMENITIES_SUCCESS
//                 || type == types.LOAD_POI_SUCCESS
//                 || type == types.LOAD_FAVORITES_SUCCESS
//                 || type == types.LOAD_SCORES_SUCCESS
//     );
// }

export default function ajaxStatusReducer(state = initialState.loadingStatus, action) {
    switch(action.type) {
      case types.BEGIN_POSTS_AJAX_CALL:
      case types.BEGIN_TEAMS_AJAX_CALL:
      case types.BEGIN_VENUES_AJAX_CALL:
      case types.BEGIN_AMENITIES_AJAX_CALL:
      case types.BEGIN_POI_AJAX_CALL:
      case types.BEGIN_VENUEDETAILS_AJAX_CALL:
      {
           return Object.assign({}, state, {
               ajaxCallsInProgress: 1
            });
      }
      case types.LOAD_POSTS_SUCCESS:
      case types.LOAD_TEAMS_SUCCESS:
      case types.LOAD_VENUESMAIN_SUCCESS:
      case types.LOAD_AMENITIES_SUCCESS:
      case types.LOAD_POI_SUCCESS:
      case types.VENUE_DETAIL_USERS_SUCCESS:
      {
           return Object.assign({}, state, {
               ajaxCallsInProgress: 0
            });
      }
      case types.BEGIN_FAVORITES_AJAX_CALL:
      {
           return Object.assign({}, state, {
               loadingFavorites: 1
            });
      }
      case types.LOAD_FAVORITES_SUCCESS:
      {
           return Object.assign({}, state, {
               loadingFavorites: 0
            });
      }
      case types.BEGIN_SCORES_AJAX_CALL:
      {
           return Object.assign({}, state, {
               loadingScores: 1
            });
      }
      case types.LOAD_SCORES_SUCCESS:
      {
           return Object.assign({}, state, {
               loadingScores: 0
            });
      }
      default:
        return state;
    }

//   if (actionTypeBeginCheck(action.type)) {
//       return Object.assign({}, state, {
//          ajaxCallsInProgress: 1
//        });
//   } else if (action.type == types.AJAX_CALL_ERROR ||
//     actionTypeEndCheck(action.type)) {
//         return Object.assign({}, state, {
//            ajaxCallsInProgress: 0
//          });
// }
  // return state;
}
