import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import auth from '../auth/authenticator';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loginSuccess() {
  return {type: types.LOG_IN_SUCCESS};
}
export function userCreateSuccess() {
  return {type: types.USER_CREATE_SUCCESS};
}

export function loginUser(credentials) {
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
          if(response && response.count && response.count === 1)
          {
              sessionStorage.setItem('jwt', response.count);
              sessionStorage.setItem('username', credentials.PEmailA1);
              dispatch(loginSuccess());
          }
          else
          {
             if(response && response.count && response.count > 1){
                 throw("Multiple Accounts Found");
             }
             else {
                 throw("Login Email/Password incorrect");
             }
           }
    }).catch(error => {
      //debugger;
      throw(error);
    });
  };
}

export function isEmailTaken(email) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
        dispatch( beginAjaxCall());
        return sessionApi.isEmailTaken(email).then(response => {
            //debugger;
            if(response && response.count && response.count > 0){
                return true;
            }
            else{
                return false;
            }
         }).catch(error => {
            // console.log("error getting posts");
             dispatch(ajaxCallError(error));
             throw(error);
         });
     };
 }

 export function isUserNameTaken(username) {
   // make async call to api, handle promise, dispatch action when promise is resolved
   return function(dispatch) {
         dispatch( beginAjaxCall());
         return sessionApi.isUserNameTaken(username).then(response => {
            // debugger;
             if(response && response.count && response.count > 0){
                 return true;
             }
             else{
                 return false;
             }
          }).catch(error => {
             // console.log("error getting posts");
              dispatch(ajaxCallError(error));
              throw(error);
          });
      };
  }


export function saveUser(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return sessionApi.saveUser(user)
    .then(response => {
        //debugger;
        sessionStorage.setItem('jwt', true);
        sessionStorage.setItem('username', user.PUserName);
        dispatch(userCreateSuccess(user));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}


export function logOutUser() {
  auth.logOut();
  return {type: types.LOG_OUT};
}
