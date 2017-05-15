import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import auth from '../auth/authenticator';


export function loginSuccess() {
  return {type: types.LOG_IN_SUCCESS};
}

export function loginFailure() {
  return {type: types.LOG_IN_FAILED};
}


export function loginUser(credentials) {
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
     // debugger;
      if(response && response.count && response.count === 1)
      {
          sessionStorage.setItem('jwt', response.count);
          //debugger;
          sessionStorage.setItem('username', credentials.PEmailA1);
          dispatch(loginSuccess());
      }
      else {
          dispatch(loginFailure());
      }

    }).catch(error => {
      //debugger;
      throw(error);
    });
  };
}

export function logOutUser() {
  auth.logOut();
  return {type: types.LOG_OUT};
}
