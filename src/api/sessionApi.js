import {fetchWithDelay2} from './delay';
import axios from 'axios';

const md5 = require('md5');

function handleErrors(response) {
       if (!response.status == "200")  {
            throw Error(response.statusText);
        }
        return response;
 }

 function validateEmail (email) {
         let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(email);
 }

class SessionApi {

    static login(credentials) {
        let obj = null;
        let promises= [];
        let isEmailPresent = false;
        let filter = "";
        if(validateEmail(credentials.PEmailA1))
        {
            obj =  credentials;
            obj.PPassword =  md5(obj.PPassword);
            obj.PEmailA1 =  obj.PEmailA1.toLowerCase();
            isEmailPresent = true;
        }
        else {
            obj =  {PUserName: "", PPassword: ""};
            obj.PUserName =  credentials.PEmailA1.toLowerCase();
            obj.PPassword =  md5(credentials.PPassword);
        }

        let url = `${process.env.API_HOST}/sb_users/count?where=` + JSON.stringify(obj);
        promises.push(axios.get(url));

        if(isEmailPresent){
        filter = "filter[where][PEmailA1]=" + credentials.PEmailA1.toLowerCase();
        }
        else {
        filter = "filter[where][PUserName]=" +credentials.PEmailA1.toLowerCase();
        }
        const userRequest = `${process.env.API_HOST}/sb_users?` + filter;
        promises.push(axios.get(userRequest));

        return axios.all(promises)
        .then(
             axios.spread(function (response, userResponse) {
                 if(response && response.status =="200" && response.data.count && response.data.count == 1)
                 {
                    if(userResponse && userResponse.data[0] && userResponse.data[0].id && userResponse.data[0].id > 0){
                            localStorage.setItem('jwt', true);
                            localStorage.setItem('username', userResponse.data[0].PUserName);
                            localStorage.setItem('userid', userResponse.data[0].id);
                            return true;
                        }
                        else {
                            return false;
                        }
                 }
                 else
                 {
                     if(response && response.data.count && response.data.count > 1){
                         throw("Multiple Accounts Found");
                     }
                     else {
                         throw("Login Email/Password incorrect");
                     }
                  }
         })
        ).catch(error => {
          throw error;
        });

      }




          static getUser(credentials) {
            let isEmailPresent = false;
            let filter = "";
            if(validateEmail(credentials.PEmailA1))
            {
              isEmailPresent = true;
            }
            if(isEmailPresent){
              filter = "filter[where][PEmailA1]=" + credentials.PEmailA1.toLowerCase();
            }
            else {
              filter = "filter[where][PUserName]=" +credentials.PEmailA1.toLowerCase();
            }
            // const request = new Request(`${process.env.API_HOST}/sb_users?` + filter, {
            // method: 'GET'
            // });
            const request = `${process.env.API_HOST}/sb_users?` + filter;
            return fetchWithDelay2(request)
            .then(handleErrors)
            .then(response => {
                return response.data;
            }).catch(error => {
              throw error;
            });
          }

          static getAllUsers() {
            const url = `${process.env.API_HOST}/sb_users`;
            return fetchWithDelay2(url)
            .then(handleErrors)
            .then(response => {
                return response.data;
            }).catch(error => {
              throw error;
            });
          }

          static isEmailTaken(email) {
            let obj = {"PEmailA1": ""};
            obj.PEmailA1 = email.toLowerCase();
            const url = `${process.env.API_HOST}/sb_users/count?where=` + JSON.stringify(obj);
            return fetchWithDelay2(url)
            .then(handleErrors)
            .then(response => {
                    return response.data;
            }).catch(error => {
              throw error;
            });
          }

          static isUserNameTaken(username) {
            let obj = {"PUserName": ""};
            obj.PUserName = username.toLowerCase();
            const url = `${process.env.API_HOST}/sb_users/count?where=` + JSON.stringify(obj) ;
            return fetchWithDelay2(url)
            .then(handleErrors)
            .then(response => {
              return response.data;
            }).catch(error => {
             throw error;
            });
          }

          static saveUser(user) {
              let promises= [];
              let filter = "";

              let submitUser = Object.assign({}, user);
              submitUser.PPassword = md5(user.PPassword);
              submitUser.PEmailA1 = user.PEmailA1.toLowerCase();
              submitUser.PUserName = user.PUserName.toLowerCase();
              const url = `${process.env.API_HOST}/sb_users`;
              promises.push(axios.post(url,submitUser));
              return axios.all(promises)
              .then(
                   axios.spread(function (response) {
                    if(response && response.status =="200" && response.data && response.data.id > 0){
                                  localStorage.setItem('jwt', true);
                                  localStorage.setItem('username', response.data.PUserName);
                                  localStorage.setItem('userid', response.data.id);
                                  return true;
                       }
                       else
                       {
                          console.log("here");
                          throw("Error occured while registering..");
                        }
               })
              ).catch(error => {
                throw error;
              });
            }
    }

    export default SessionApi;


    // static login(credentials) {
    //     let obj = null;
    //     if(validateEmail(credentials.PEmailA1))
    //     {
    //         obj =  credentials;
    //         obj.PPassword =  md5(obj.PPassword);
    //         obj.PEmailA1 =  obj.PEmailA1.toLowerCase();
    //     }
    //     else {
    //         obj =  {PUserName: "", PPassword: ""};
    //         obj.PUserName =  credentials.PEmailA1.toLowerCase();
    //         obj.PPassword =  md5(credentials.PPassword);
    //     }
    //
    //     let url = `${process.env.API_HOST}/sb_users/count?where=` + JSON.stringify(obj);
    //     return fetchWithDelay2(url)
    //     .then(handleErrors)
    //     .then(response => {
    //       return response.data;
    //     }).catch(error => {
    //       throw error;
    //     });
    //
    //   }


    // static saveUser(user) {
    //     let submitUser = Object.assign({}, user);
    //     submitUser.PPassword = md5(user.PPassword);
    //     submitUser.PEmailA1 = user.PEmailA1.toLowerCase();
    //     submitUser.PUserName = user.PUserName.toLowerCase();
    //     const url = `${process.env.API_HOST}/sb_users`;
    //     //DO NOT USE fetchWithDelay
    //   //   return fetch(url, {
    //   //        method: 'POST',
    //   //        headers: {
    //   //          'Content-Type': 'application/json'
    //   //        },
    //   //        body: JSON.stringify(submitUser)
    //   //    })
    //   //    .then(handleErrors)
    //   //    .then(response => {
    //   //         return response.json();
    //   //   }).catch(error => {
    //   //         throw error;
    //   //   });
    //
    //    return axios
    //    .post(url,submitUser)
    //    .then(handleErrors)
    //    .then(response => {
    //         return response.data;
    //   }).catch(error => {
    //         throw error;
    //   });
    //
    //   }
