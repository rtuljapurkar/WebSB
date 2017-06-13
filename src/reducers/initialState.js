import React, {PropTypes} from 'react';
const uuidV1 = require('uuid/v1');
import moment from 'moment';

let dateNow = new Date();
let dateTime = new Date() ;
dateTime = moment(dateTime, "MM-DD-YYYY").subtract(1,'days').format("YYYY-MM-DD");

export default {
    venues: {
        data: [],
        sortDesc: false,
        sortKey: 'VName',
        filterString: ''
    },
    teams: [],
    posts: {
          data: [{id: 0, VName: '', VAddress: '', Stars:"0", VCity: '', VImage: '', VenueID:0,  UserName:"" }],
          sortDesc: true,
          sortKey: 'id',
          filterString: '',
          Active: "1",
          users: [{
                    "PUserName": '',
                    "PPassword": '',
                    "PUserImage":'',
                    "PEmailA1": '',
                    "PLoginSessionAccessToken": '',
                    "PUserLastLogin": '',
                    id: 0
                }],
          venues: [{
                      id:0,
                      VName:'',
                      VCity:'',
                      VImage:'',
                      VDescription:''
                }]
    },
    loadingStatus: {
                ajaxCallsInProgress: 0,
                loadingFavorites: 0,
                loadingScores: 0
            },
    session: {
              isUserLoggedIn: !!localStorage.jwt,
              user: {   "PUserName": '',
                        "PPassword": '',
                        "PPasswordConfirm":'',
                        "PEmailA1": '',
                        "PLoginSessionAccessToken": uuidV1(),
                        "PUserLastLogin": dateNow,
                        "PUserImage":""
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
                            VDescription:'',
                            VGPSLoc:''
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
                            "id": 0
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
              AvailableDates: [
                  {
                      "Dates": ""
                  }
              ],
              sortDesc: false,
              sortKey: 'VName',
              filterString: '',
              dateSelected: dateTime
          },
    newPost:{   data: {Text: '', VenueID:0, POIID: 0, AmenityID:'', UserName:localStorage.username, Stars:0,  UploadTime: new Date(), Active:1, Image: '', Reply: ''},

                venue:{ id:0, VName:'', VCity:'', VImage:'', VDescription:''},

                amenity: {    "VenueID":0,"AName": '',"ASection": '',"AChildAmenity": '',"AType": '',"ASubType": '', "AMainFood": '',"AVeggieFood": '',
                              "AVeganFood": '',"AGFFood": '',"ABeverages": '', "ADomesticBeer": '',"ACraftBeer": '',"AMixedDrinks": '',"ATags": '',"ACost": '',
                              "ADistance": '',"AWalkingTime": '',"ALotLocation": '',"AKidsOk": '',"Active":1,"AImage": "",
                              "id":0
                          },
                pointOfInterest: {
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
                                      "id": 0
                                  }
           },

    venueDetail: {
              sortDesc: true,
               sortKey: 'UploadTime',
               venueRelatedPosts: [{
                                     "VenueID": 0,
                                     "AmenityID": 0,
                                     "POIID": 0,
                                     "UserName": "",
                                     "Image": "",
                                     "Text": "",
                                     "Stars": 0,
                                     "UploadTime": "",
                                     "Reply": "",
                                     "Active": 1,
                                     "id": 0
                                 }],
             venue:  {
                         "VName": "",
                         "VAddress": "",
                         "VCity": "",
                         "VState": "",
                         "VZip": "",
                         "VGPSLoc": "",
                         "VDescription": "",
                         "VCapacity": "" ,
                         "VDetails": "",
                         "VTags": "",
                         "Active": 1,
                         "VImage": "",
                         "id": 0
                     },
             amenities: [{
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
                  }],
            pointOfInterests: [{
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
                        "POIImage": "",
                        "id": 0
                    }],
            users: [{
                      "PUserName": '',
                      "PPassword": '',
                      "PUserImage":'',
                      "PEmailA1": '',
                      "PLoginSessionAccessToken": '',
                      "PUserLastLogin": '',
                      id: 0
                  }]
                 }
};
