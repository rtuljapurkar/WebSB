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

          static getAmenityByID(ID) {
                    const host = `${process.env.API_HOST}`;
                    const request = new Request(`${process.env.API_HOST}/sb_amenity/`+ ID, {
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
                console.log("in api");
                console.log(post);
                post.UploadTime = new Date();
                let url = "";
                if(post.AmenityID == 0){
                         url = `${process.env.API_HOST}/sb_post_venue`;
                    }
                    else {
                         url = `${process.env.API_HOST}/sb_post_venue_amenity`;
                    }
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
