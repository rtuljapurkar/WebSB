const md5 = require('md5');

function handleErrors(response) {
    //debugger;
     if (!response.ok) {
         throw Error(response.statusText);
     }
     return response;
 }

class SessionApi {
          static login(credentials) {
            let obj = credentials;
            obj.PEmailA1 = obj.PEmailA1.toLowerCase();
            obj.PPassword =  md5(obj.PPassword);
            // obj.PEmailA1 = "456@test.com";
            // obj.PPassword ="e10adc3949ba59abbe56e057f20f883e";

            const url = `${process.env.API_HOST}/sb_users/count?where=` + JSON.stringify(obj);
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
            //debugger;
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
            //debugger;
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
            //  debugger;
              let submitUser = Object.assign({}, user);
              submitUser.PPassword = md5(user.PPassword);
              submitUser.PEmailA1 = user.PEmailA1.toLowerCase();
              submitUser.PUserName = user.PUserName.toLowerCase();
            //  debugger;
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
                  //  debugger;
                    return response.json();
              }).catch(error => {
                    throw error;
              });
            }
    }

    export default SessionApi;





    //    debugger;
        // try
    // {
    // request = new Request(
    //                 `${process.env.API_HOST}/sb_users/count`,
    //                 { method: 'GET',
    //                   headers: new Headers({
    //                                         'Content-Type': 'application/json',
    //                                         'where': credentials
    //                                       })
    //                 }
    //     );
    // }
    // catch(ex)
    // {
    //     debugger;
    // }
