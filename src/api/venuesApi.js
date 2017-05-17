function handleErrors(response) {    
     if (!response.ok) {
         throw Error(response.statusText);
     }
     return response;
 }

class VenuesApi {
  static getAllVenues() {
        //console.log("in getAllVenues api call");
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
          //console.log("in getAllVenues api call");
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
}

export default VenuesApi;
