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

function validateEmail (email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}

export function loginUser(credentials) {
    let isEmailPresent = false;
    if(validateEmail(credentials.PEmailA1))
    {
        isEmailPresent = true;
    }
    return function(dispatch) {
    return sessionApi.login(credentials).then(response => {

          if(response && response.count && response.count === 1)
          {
              localStorage.setItem('jwt', response.count);
              localStorage.setItem('username', credentials.PEmailA1);
              sessionApi.getUser(credentials).then(response => {
                 // debugger;
                     if(isEmailPresent == true){
                          response = response.filter( r => r.PEmailA1.toLowerCase() == credentials.PEmailA1.toLowerCase() );
                      }
                      else {
                          response = response.filter( r => r.PUserName.toLowerCase() == credentials.PEmailA1.toLowerCase() );
                      }
                    if(response && response[0] && response[0].id && response[0].id > 0)
                    {
                        localStorage.setItem('username', response[0].PUserName);
                        localStorage.setItem('userid', response[0].id);
                    }
                });
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
            sessionApi.getUser(user).then(response => {
               // debugger;
                response = response.filter( r => r.PEmailA1.toLowerCase() == user.PEmailA1.toLowerCase() );
                if(response && response[0] && response[0].id && response[0].id > 0)
                  {
                      localStorage.setItem('username', response[0].PUserName);
                      localStorage.setItem('userid', response[0].id);
                  }
              });
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
