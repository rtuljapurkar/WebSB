import React, {PropTypes} from 'react';
const uuidV1 = require('uuid/v1');
let dateNow = new Date();

let today = new Date();
let dd = today.getDate()-20;
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd;
}
if(mm<10) {
    mm='0'+mm;
}
today = mm+'/'+dd+'/'+yyyy;

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
          venue:null,
          Active: "1"

    },
    ajaxCallsInProgress: 0,
    session: {
              isUserLoggedIn: !!localStorage.jwt,
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
                filterType: '',
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
                         "Active": "1",
                         "AImage": "",
                         "id": 0
                        }]
            },
    pointOfInterests: {
                sortDesc: false,
                sortKey: 'POIName',
                venue: {
                            id:0,
                            VName:'',
                            VCity:'',
                            VImage:'',
                            VDescription:''
                        },
                filterString: '',
                data: [{
                            "VenueID": 0,
                            "POIName": "",
                            "POIType": "",
                            "POIAddress": "",
                            "POICity": "",
                            "POIState": "",
                            "POIZip": "",
                            "POIGPSLoc": "",
                            "POIPhone": "",
                            "POIDescription": "",
                            "POIDetails": "",
                            "POITags": "",
                            "Active": 1,
                            "POIImage": "1",
                            "id": 1
                        }]
            },
    favorites: {
              data: [{id: '', UserID: '', VenueID: '' }],
              sortDesc: false,
              sortKey: 'VName',
              filterString: ''
          },
    scores:  {
              data: [{
                      "ID": '',
                      "GameDate": '',
                      "GameTime": '',
                      "League": '',
                      "Status": '',
                      "VName": '',
                      "HomeTeam": '',
                      "AwayTeam":'',
                      "HomeLogo":'',
                      "AwayLogo": '',
                      "HPoints": 0,
                      "APoints": 0,
                      "Active": 0
               }],
              sortDesc: false,
              sortKey: 'VName',
              filterString: '',
              dateSelected: today
          }
};
