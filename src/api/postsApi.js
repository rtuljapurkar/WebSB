function handleErrors(response) {
    console.log("in handleErrors");
     if (!response.ok) {
         throw Error(response.statusText);
     }
     return response;
 }

class PostsApi {
  static getAllPosts() {
        console.log("in getAllposts api call");
        const host = `${process.env.API_HOST}`;
        const request = new Request(`${process.env.API_HOST}/sb_post_venue`, {
          method: 'GET'
        });

        return fetch(request)
        .then(handleErrors)
        .then(response => {
            console.log(response);
                return response.json();
            }).catch(error => {
                throw error;
            });
        }

        static getVenueByID(ID) {
              //console.log("in getAllposts api call");
              const host = `${process.env.API_HOST}`;
              const request = new Request(`${process.env.API_HOST}/sb_venue/`+ ID, {
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

        static savePost(post) {
            debugger;
                let request = "" ;
                const url = `${process.env.API_HOST}/sb_post_venue`;
                fetch(url, {
                     method: 'post',
                     headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                     },
                     body: JSON.stringify(post)
                 }).then(response => {
                    debugger;
                  return response.json();
                }).catch(error => {
                  return error;
                });
              }

}

export default PostsApi;
