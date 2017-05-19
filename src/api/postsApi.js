function handleErrors(response) {
     if (!response.ok) {
         throw Error(response.statusText);
     }
     return response;
 }

class PostsApi {

        static getAllPosts() {
            const host = `${process.env.API_HOST}`;
            const request = new Request(`${process.env.API_HOST}/sb_post_venue`, {
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

        static getVenueByID(ID) {
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
               post.UploadTime = new Date();
                let request = "" ;
                const url = `${process.env.API_HOST}/sb_post_venue`;
                return fetch(url, {
                     method: 'POST',
                     headers: {
                       'Content-Type': 'application/json'
                     },
                     body: JSON.stringify(post)
                 }).then(handleErrors)
                 .then(response => {
                  return response.json();
                }).catch(error => {
                  throw error;
                });
              }

}

export default PostsApi;
