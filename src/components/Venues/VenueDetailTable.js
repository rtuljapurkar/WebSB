import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {Button, Glyphicon} from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {Link} from 'react-router';
import ReactStars from 'react-stars';

// Stateless cell components for Table component
function renderSortArrow (sortKey, sortDesc, sortId) {
  return sortKey === sortId ? (sortDesc ? '↓' : '↑') : '';
}

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}



//  --------------------------------------------------------------------------------------------------------------//
const VenueDetailTable = ({post, venue, amenities, pointOfInterests, users}) => {
        let ONE_DAY = 1000 * 60 * 60 * 24;
        // Convert both dates to milliseconds
        let currentDate = new Date().getTime();
        let postDate = new Date(post["UploadTime"]).getTime();
        // Calculate the difference in milliseconds
        let difference_ms = Math.abs(currentDate - postDate);
        // Convert back to days and return
        let days = Math.round(difference_ms/ONE_DAY);
        let postDate1 = new Date(post["UploadTime"]);
        let postedTime = timeSince(postDate1);
        let venueID = post["VenueID"];
        let userName = post["UserName"];
        let vname = "";
        let userImage = "";

        let amenityName = "";
        //let amenityImage = "";
        if(post.AmenityID > 0)
        {
            try{
                amenityName = amenities[post.AmenityID -1].AName;
                //amenityImage = amenities[post.AmenityID -1 ].AImage;
            }catch(ex){
                //amenityImage = "";
            amenityName = "";
            }
        }

        let poiName = "";
        let poiImage = "";
        if(post.POIID > 0)
        {
            poiName = "POI: " + post.POIID ;
            try{
                poiName = pointOfInterests[post.POIID-1].POIName;
                poiImage = pointOfInterests[post.POIID-1].POIImage;
            }catch(ex){
                poiName = "";
                poiImage = "";
            }
        }

        if(isNaN(venueID))
        {
          venueID = 0;
        }
        try{
          vname = venue.VName;
        }
        catch(ex) {
          vname = "";
        }

        try{
            let user = users.filter((u)=> u.PUserName.toLowerCase() == userName.toLowerCase());
            userImage = user[0].PUserImage;
        }
        catch (ex) {
            userImage = "";
        }
        if(userImage == undefined)
        {
            userImage ="";
        }

        return (
                <div className="blackBg">
                    <div className="ib">
                        <div>
                            <div>
                                {userImage =="" && <img src= {require('../../images/favicon.ico')} width="30" height="30" alt="logo"/>}
                                {userImage !="" && <img src= {userImage} width="30" height="30" alt=""/>}
                                <br/>
                            </div>
                            <div style={{"vertical-align": "middle"}}>
                               {post["UserName"]} <br/>
                               <ReactStars
                               name={name}
                               count={5}
                               className="form-control"
                               size={24}
                               edit={false}
                               value={post["Stars"]}
                               color2={'#ffd700'} />
                           </div>
                        </div>
                        <div>&nbsp;<br/></div>
                        <div>
                            {amenityName =="" && poiName =="" && vname}
                            {amenityName!="" && amenityName + " at " + vname}
                            {poiName!="" &&  poiName +" at " + vname}
                            <br/><br/>
                        </div>
                        <div >
                            {post["Text"]}
                        </div>
                        <div>&nbsp;<br/></div>
                        <div>
                           <span style={{"textAlign":"Right"}}> Posted {postedTime}<br/></span>
                        </div>
                    </div>
                    {post["Image"] &&
                        <div className="ibright">
                            <img src={post["Image"]} height="200" alt="" width="200" />
                        </div>}
                    {!post["Image"] &&
                        <div className="ibright">
                        </div>}
                    <div className="break"></div>
                  </div>
                );
};

VenueDetailTable.propTypes = {
  // actions
  //fetchData: PropTypes.func.isRequired,
  sortBy: PropTypes.func,
  filterBy: PropTypes.func,

  // state data
  data: PropTypes.array,
  filterString: PropTypes.string,
  sortKey: PropTypes.string,
  sortDesc: PropTypes.bool,
  post: PropTypes.array,
  actions: PropTypes.object,
  venue:PropTypes.object,
  amenities: PropTypes.object,
  pointOfInterests: PropTypes.object,
  users: PropTypes.object
};

export default VenueDetailTable;
