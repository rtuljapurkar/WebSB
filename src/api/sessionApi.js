import delay from './delay';


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
            // obj.PEmailA1 = "456@test.com"; // obj.PPassword ="e10adc3949ba59abbe56e057f20f883e";

            return fetch(url)
            .then(handleErrors)
            .then(response => {
              return response.json();
            }).catch(error => {
              throw error;
            });

          }

          static getUser(credentials) {
              let obj = null;
              if(validateEmail(credentials.PEmailA1))
              {
                  obj =  credentials;
                  obj.PEmailA1 =  obj.PEmailA1.toLowerCase();
              }
              else {
                  obj =  {PUserName: "", PPassword: ""};
                  obj.PUserName =  credentials.PEmailA1.toLowerCase();
              }
                debugger;
            const url = `${process.env.API_HOST}/sb_users/findOne?filter=` + JSON.stringify(obj);
            return fetch(url)
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
