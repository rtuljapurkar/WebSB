import {fetchWithDelay2} from  './delay';
import axios from 'axios';

function handleErrors(response) {
    if (!response.status == "200")  {
         throw Error(response.statusText);
     }
     return response;
 }

class PostsApi {

        static getVenuePosts() {
            let filter ="";
            filter = "filter[where][Active]=1";
            const host = `${process.env.API_HOST}`;
            // const request = new Request(`${process.env.API_HOST}/sb_post_venue?` + filter, {
            //   method: 'GET'
            // });
            const request = `${process.env.API_HOST}/sb_post_venue?` + filter;
            return fetchWithDelay2(request)
            .then(handleErrors)
            .then(response => {
                    return response.data;
                }).catch(error => {
                    throw error;
                });
            }

        static getVenuePostsByVenue(venueID) {
            let filter ="";
            if (!isNaN(venueID)){
                  filter = "filter[where][VenueID]=" + venueID + "&filter[where][Active]=1"; //131
                }
                else {
                  filter = "filter[where][VenueID]=0&filter[where][Active]=1"; //131
                }
            const host = `${process.env.API_HOST}`;
            // const request = new Request(`${process.env.API_HOST}/sb_post_venue?` + filter, {
            //   method: 'GET'
            // });
            const request = `${process.env.API_HOST}/sb_post_venue?` + filter;
            return fetchWithDelay2(request)
            .then(handleErrors)
            .then(response => {
                    return response.data;
                }).catch(error => {
                    throw error;
                });
            }

        static getAmenityPosts(venueID) {
            let filter ="";
            if (!isNaN(venueID)){
                  filter = "filter[where][VenueID]=" + venueID + "&filter[where][Active]=1"; //131
                }
                else {
                  filter = "filter[where][VenueID]=0&filter[where][Active]=1"; //131
                }
            const host = `${process.env.API_HOST}`;
            // const request = new Request(`${process.env.API_HOST}/sb_post_venue_amenity?` + filter, {
            //   method: 'GET'
            // });
            const request = `${process.env.API_HOST}/sb_post_venue_amenity?` + filter;
            return fetchWithDelay2(request)
            .then(handleErrors)
            .then(response => {
                    return response.data;
                }).catch(error => {
                    throw error;
                });
            }

        static getPOIPosts(venueID) {
                let filter ="";
                if (!isNaN(venueID)){
                      filter = "filter[where][VenueID]=" + venueID + "&filter[where][Active]=1"; //131
                    }
                    else {
                      filter = "filter[where][VenueID]=0&filter[where][Active]=1"; //131
                    }
                const host = `${process.env.API_HOST}`;
                // const request = new Request(`${process.env.API_HOST}/sb_post_venue_poi?` + filter, {
                //   method: 'GET'
                // });
                const request = `${process.env.API_HOST}/sb_post_venue_poi?` + filter;
                return fetchWithDelay2(request)
                .then(handleErrors)
                .then(response => {
                        return response.data;
                    }).catch(error => {
                        throw error;
                    });
                }

        static getVenueByID(ID) {
              const host = `${process.env.API_HOST}`;
            //   const request = new Request(`${process.env.API_HOST}/sb_venue/`+ ID, {
            //     method: 'GET'
            //   });
              const request = `${process.env.API_HOST}/sb_venue/`+ ID;
              return fetchWithDelay2(request)
              .then(handleErrors)
              .then(response => {
                      return response.data;
                  }).catch(error => {
                      throw error;
                  });
              }

          static getAmenityByID(ID) {
                    const host = `${process.env.API_HOST}`;
                    // const request = new Request(`${process.env.API_HOST}/sb_amenity/`+ ID, {
                    //   method: 'GET'
                    // });
                    const request = `${process.env.API_HOST}/sb_amenity/`+ ID;
                    return fetchWithDelay2(request)
                    .then(handleErrors)
                    .then(response => {
                            return response.data;
                        }).catch(error => {
                            throw error;
                        });
                    }

            static getPOIByID(ID) {
                      const host = `${process.env.API_HOST}`;
                    //   const request = new Request(`${process.env.API_HOST}/sb_POI/`+ ID, {
                    //     method: 'GET'
                    //   });
                      const request = `${process.env.API_HOST}/sb_POI/`+ ID;

                      return fetchWithDelay2(request)
                      .then(handleErrors)
                      .then(response => {
                              return response.data;
                          }).catch(error => {
                              throw error;
                          });
                      }


        static savePost(post) {
                post.UploadTime = new Date();
                let url = "";
                if(post.AmenityID == 0 && post.POIID == 0){
                         url = `${process.env.API_HOST}/sb_post_venue`;
                    }
                else if(post.AmenityID != 0 && post.POIID == 0){
                         url = `${process.env.API_HOST}/sb_post_venue_amenity`;
                    }
                else if(post.AmenityID == 0 && post.POIID != 0){
                         url = `${process.env.API_HOST}/sb_post_venue_poi`;
                    }
                // return fetch(url, {
                //      method: 'POST',
                //      headers: {
                //        'Content-Type': 'application/json'
                //      },
                //      body: JSON.stringify(post)
                //  }).then(handleErrors)
                //  .then(response => {
                //   return response.json();
                // }).catch(error => {
                //   throw error;
                // });

                return axios
                .post(url,post)
                .then(handleErrors)
                 .then(response => {
                  return response.data;
                }).catch(error => {
                  throw error;
                });

              }

}

export default PostsApi;
