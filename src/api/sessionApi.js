class SessionApi {

  static login(credentials) {
    let request = "" ;
    const url = `${process.env.API_HOST}/sb_users/count?where={"PEmailA1": "456@test.com","PPassword": "e10adc3949ba59abbe56e057f20f883e"}`;
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

    return fetch(url).then(response => {
    //    console.log(url)
     // console.log(response);
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default SessionApi;
