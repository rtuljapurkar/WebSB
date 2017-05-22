import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import mockApi from '../api/mockApi';
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
              localStorage.setItem('jwt', response.count);
              localStorage.setItem('username', credentials.PEmailA1);
            //   sessionApi.getUser(credentials).then(response => {
            //         if(response && response.id && response.id > 0)
            //         {
            //             localStorage.setItem('username', response.PUserName);
            //             localStorage.setItem('userid', response.id);
            //         }
            //     });
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
      throw(error);
    });
  };
}

export function isEmailTaken(email) {
  // make async call to api
  return function(dispatch) {
        dispatch( beginAjaxCall());
        return sessionApi.isEmailTaken(email).then(response => {
            if(response && response.count && response.count > 0){
                return true;
            }
            else{
                return false;
            }
         }).catch(error => {
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
             if(response && response.count && response.count > 0){
                 return true;
             }
             else{
                 return false;
             }
          }).catch(error => {
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
        localStorage.setItem('jwt', true);
        localStorage.setItem('username', user.PUserName);
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
