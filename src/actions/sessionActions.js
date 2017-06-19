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
    return function(dispatch) {
          dispatch(beginAjaxCall());
        return sessionApi.login(credentials)
        .then( result =>{
                        if(result)
                        {
                            dispatch(loginSuccess());
                        }
        }).catch(error => {
              throw(error);
            });

            // .then(response =>{
            //         dispatch(loginSuccess());

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
        .then( result =>{
                        if(result)
                        {
                            dispatch(userCreateSuccess(user));
                        }
                        else{
                            throw("Error occured while registering..");
                        }
        }).catch(error => {
              throw(error);
            });

    //
    //     .then(response => {
    //         if(response && response.id > 0){
    //             localStorage.setItem('jwt', true);
    //             localStorage.setItem('username', user.PUserName);
    //             sessionApi.getUser(user)
    //             .then(userResponse => {
    //                 userResponse = userResponse.filter( r => r.PEmailA1.toLowerCase() == user.PEmailA1.toLowerCase() );
    //                 if(userResponse && userResponse[0] && userResponse[0].id && userResponse[0].id > 0)
    //                   {
    //                       localStorage.setItem('jwt', true);
    //                       localStorage.setItem('username', userResponse[0].PUserName);
    //                       localStorage.setItem('userid', userResponse[0].id);
    //                   }
    //               });
    //             }
    //         else {
    //                 throw("Error occured while registering..");
    //             }
    // dispatch(userCreateSuccess(user));
    // }).catch(error => {
    //   dispatch(ajaxCallError(error));
    //   throw(error);
    // });
  };
}

export function logOutUser() {
  auth.logOut();
  return {type: types.LOG_OUT_SUCCESS};
}




// export function loginUser(credentials) {
//     let isEmailPresent = false;
//     if(validateEmail(credentials.PEmailA1))
//     {
//         isEmailPresent = true;
//     }
//     return function(dispatch) {
//           dispatch(beginAjaxCall());
//         return sessionApi.login(credentials)
//             .then(response =>{
//                   if(response && response.count && response.count === 1)
//                   {   console.log(credentials.PEmailA1.toLowerCase());
//                       localStorage.setItem('jwt', true);
//                       localStorage.setItem('username', credentials.PEmailA1.toLowerCase());
//                       sessionApi.getUser(credentials)
//                       .then(userresponse => {
//                            console.log("here2");
//                              if(isEmailPresent == true){
//                                   userresponse = userresponse.filter( r => r.PEmailA1.toLowerCase() == credentials.PEmailA1.toLowerCase() );
//                               }
//                               else {
//                                   userresponse = userresponse.filter( r => r.PUserName.toLowerCase() == credentials.PEmailA1.toLowerCase() );
//                               }
//                               console.log("here");
//                               console.log(userresponse[0].id);
//                             if(userresponse && userresponse[0] && userresponse[0].id && userresponse[0].id > 0)
//                             {
//                                 localStorage.setItem('jwt', true);
//                                 localStorage.setItem('username', userresponse[0].PUserName);
//                                 localStorage.setItem('userid', userresponse[0].id);
//                             }
//                     });
//                     dispatch(loginSuccess());
//                 }
//                else
//                   {  if(response && response.count && response.count > 1){
//                          throw("Multiple Accounts Found");
//                      }
//                      else {
//                          throw("Login Email/Password incorrect");
//                      }
//                    }
//                 }).catch(error => {
//                   throw(error);
//                 });
//   };
// }


// export function saveUser(user) {
//     return function (dispatch, getState) {
//         dispatch(beginAjaxCall());
//         return sessionApi.saveUser(user)
//         .then(response => {
//             if(response && response.id > 0){
//                 localStorage.setItem('jwt', true);
//                 localStorage.setItem('username', user.PUserName);
//                 sessionApi.getUser(user)
//                 .then(userResponse => {
//                     userResponse = userResponse.filter( r => r.PEmailA1.toLowerCase() == user.PEmailA1.toLowerCase() );
//                     if(userResponse && userResponse[0] && userResponse[0].id && userResponse[0].id > 0)
//                       {
//                           localStorage.setItem('jwt', true);
//                           localStorage.setItem('username', userResponse[0].PUserName);
//                           localStorage.setItem('userid', userResponse[0].id);
//                       }
//                   });
//                 }
//             else {
//                     throw("Error occured while registering..");
//                 }
//     dispatch(userCreateSuccess(user));
//     }).catch(error => {
//       dispatch(ajaxCallError(error));
//       throw(error);
//     });
//   };
// }
