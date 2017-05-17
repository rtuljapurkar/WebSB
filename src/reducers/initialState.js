import React, {PropTypes} from 'react';
const uuidV1 = require('uuid/v1');
let dateNow = new Date();

export default {
  venues: {
    data: [],
    sortDesc: false,
    sortKey: 'VName',
    filterString: ''
  },
  teams: [],
  posts: {
          data: [],
          sortDesc: true,
          sortKey: 'id',
          filterString: '',
          venue:null

  },
  ajaxCallsInProgress: 0,
  session: {
              isUserLoggedIn: !!sessionStorage.jwt,
              user: {   "PUserName": '',
                        "PPassword": '',
                        "PPasswordConfirm":'',
                        "PEmailA1": '',
                        "PLoginSessionAccessToken": uuidV1(),
                        "PUserLastLogin": dateNow
                    }
           },
    amenities: {
                    sortDesc: false,
                    sortKey: 'AName',
                    venue: {
                                id:0,
                                VName:'',
                                VCity:'',
                                VImage:'',
                                VDescription:''
                            },
                    filterString: '',
                    data: [{
                            "VenueID": "",
                             "AName": "",
                             "AType": "",
                             "AMainFood": "",
                             "AVeggieFood": "",
                             "AVeganFood": null,
                             "AGFFood": "",
                             "ABeverages": "",
                             "ADomesticBeer": "",
                             "ACraftBeer": "",
                             "AMixedDrinks": null,
                             "ANearestGates": "",
                             "ATags": "",
                             "ACost": null,
                             "ADistance": null,
                             "AWalkingTime": null,
                             "ALotLocation": null,
                             "Active": "",
                             "AImage": "",
                             "id": 0
                            }]
                }
};
