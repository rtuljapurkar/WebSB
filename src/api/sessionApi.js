import {fetchWithDelay} from './delay';

const md5 = require('md5');

function handleErrors(response) {
       if (!response.ok) {
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
            if(validateEmail(credentials.PEmailA1))
            {
                obj =  credentials;
                obj.PPassword =  md5(obj.PPassword);
                obj.PEmailA1 =  obj.PEmailA1.toLowerCase();
            }
            else {
                obj =  {PUserName: "", PPassword: ""};
                obj.PUserName =  credentials.PEmailA1.toLowerCase();
                obj.PPassword =  md5(credentials.PPassword);
            }

            let url = `${process.env.API_HOST}/sb_users/count?where=` + JSON.stringify(obj);
            return fetchWithDelay(url)
            .then(handleErrors)
            .then(response => {
              return response.json();
            }).catch(error => {
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
            const request = new Request(`${process.env.API_HOST}/sb_users?` + filter, {
            method: 'GET'
            });

            return fetch(request)
            .then(handleErrors)
            .then(response => {
                return response.json();
            }).catch(error => {
              throw error;
            });
          }

          static getAllUsers() {
            const url = `${process.env.API_HOST}/sb_users`;
            return fetchWithDelay(url)
            .then(handleErrors)
            .then(response => {
                return response.json();
            }).catch(error => {
              throw error;
            });
          }

          static isEmailTaken(email) {
            let obj = {"PEmailA1": ""};
            obj.PEmailA1 = email.toLowerCase();
            const url = `${process.env.API_HOST}/sb_users/count?where=` + JSON.stringify(obj);
            return fetch(url)
            .then(handleErrors)
            .then(response => {
                    return response.json();
            }).catch(error => {
              throw error;
            });
          }

          static isUserNameTaken(username) {
            let obj = {"PUserName": ""};
            obj.PUserName = username.toLowerCase();
            const url = `${process.env.API_HOST}/sb_users/count?where=` + JSON.stringify(obj) ;
            return fetch(url)
            .then(handleErrors)
            .then(response => {
              return response.json();
            }).catch(error => {
             throw error;
            });
          }

          static saveUser(user) {
              let submitUser = Object.assign({}, user);
              submitUser.PPassword = md5(user.PPassword);
              submitUser.PEmailA1 = user.PEmailA1.toLowerCase();
              submitUser.PUserName = user.PUserName.toLowerCase();
              const url = `${process.env.API_HOST}/sb_users`;
              //DO NOT USE fetchWithDelay
              return fetch(url, {
                   method: 'POST',
                   headers: {
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(submitUser)
               })
               .then(handleErrors)
               .then(response => {
                    return response.json();
              }).catch(error => {
                    throw error;
              });
            }
    }

    export default SessionApi;
