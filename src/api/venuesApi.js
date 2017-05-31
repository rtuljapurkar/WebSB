function handleErrors(response) {
     if (!response.ok) {
         throw Error(response.statusText);
     }
     return response;
 }

class VenuesApi {
  static getAllVenues() {
        const host = `${process.env.API_HOST}`;
        const request = new Request(`${process.env.API_HOST}/sb_venue`, {
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

    static getAllTeams() {
          const host = `${process.env.API_HOST}`;
          const request = new Request(`${process.env.API_HOST}/sb_teams`, {
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

          static getAllAmenities(venueID) {
                let obj = {"VenueID": 0};
                obj.VenueID = venueID;
                const host = `${process.env.API_HOST}`;
                const request = new Request(`${process.env.API_HOST}/sb_amenity?where=` + JSON.stringify(obj), {
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

                static getPointOfInterests(venueID) {
                      let obj = {"VenueID": 0};
                      obj.VenueID = venueID;
                      const host = `${process.env.API_HOST}`;
                      const request = new Request(`${process.env.API_HOST}/sb_poi?where=` + JSON.stringify(obj), {
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

              static getFavorites() {
                    let userID= localStorage["userid"];
                    let filter ="";
                    if (!isNaN(userID)){
                          filter = "filter[where][UserID]=" + userID; //131
                        }
                        else {
                          filter = "filter[where][UserID]=0"; //131
                        }
                    const host = `${process.env.API_HOST}`;
                    const request = new Request(`${process.env.API_HOST}/sb_favorites?` + filter, {
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

            static getScores() {
                  const host = `${process.env.API_HOST}`;
                  const request = new Request(`${process.env.API_HOST}/vwGameDetails`, {
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
}

export default VenuesApi;
