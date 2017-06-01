import React from 'react';
import PropTypes from 'prop-types';
//import { Column, Cell, Table } from 'fixed-data-table';
import toastr from 'toastr';
let ExampleImage = require('../common/ExampleImage');
import ReactStars from 'react-stars';

// import ResponsiveTableWrapper from '../ResponsiveTableWrapper'
//import renderers from '../../modules/renderers'
//import '../../styles/fixed-data-table.css';


// Stateless cell components for Table component

// function renderSortArrow (sortKey, sortDesc, sortId) {
//   return sortKey === sortId ? (sortDesc ? '↓' : '↑') : '';
// }
//
// function SortHeaderCell ({children, sortBy, sortKey, sortDesc, columnKey}) {
//     const clickFunc = () => sortBy(columnKey);
//   return (
//     <Cell >
//       <a onClick={clickFunc}>
//         {children} {renderSortArrow(sortKey, sortDesc, columnKey)}
//       </a>
//     </Cell>
//   );
// }
// SortHeaderCell.propTypes = {
//   sortBy: PropTypes.func.isRequired,
//   sortKey: PropTypes.string.isRequired,
//   sortDesc: PropTypes.bool.isRequired,
//   columnKey: PropTypes.string,
//   children: PropTypes.element.isRequired
// };

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
const PostsTable = ({post, venues, users}) => {
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
    //debugger;

    if(isNaN(venueID))
    {
      venueID = 0;
    }
    try{
      vname = venues[venueID].VName;
    }
    catch(ex) {
      vname = "";
    }

    try{
     let user = users.filter((u)=> u.PUserName.toLowerCase() == userName.toLowerCase());
     //console.log(user);
     userImage =  user[0].PUserImage;
    }
    catch (ex) {
     userImage = "";
    }
    if(userImage == undefined)
    {
        userImage ="";
    }
    //console.log(userName);
    return (
            <div  className="rowContainer col-md-12">
                <div className="row blackBg col-md-8" >
                    <div className="blackBg col-md-12 ">
                        <div className="blackBgInLine">
                            {userImage =="" && <img src= {require('../../images/favicon.ico')} width="30" height="30" alt="logo"/>}
                            {userImage !="" && <img src= {userImage} width="30" height="30" alt=""/>}
                            <br/>
                        </div>
                        <div className="blackBgInLine">
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
                    <div className="blackBg">
                        {vname}
                    </div>
                    <div className="blackBg">
                        {post["Text"]}
                    </div>
                    <div className="blackBg">
                       <span style={{"textAlign":"Right"}}> Posted {postedTime}<br/></span>
                    </div>
                    { post["Image"] &&
                    <div className="blackBg col-md-6" >
                        <img src={post["Image"]} height="200" alt="" width="200" />
                    </div>
                    }
                    {
                        !post["Image"] &&
                        <div className="col-md-6" >
                        </div>
                    }
                </div>

              </div>
            );
};

PostsTable.propTypes = {
  // actions
  //fetchData: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired,
  filterBy: PropTypes.func.isRequired,
  // state data
  data: PropTypes.array.isRequired,
  filterString: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  posts: PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired,
  venues: PropTypes.array,
  post: PropTypes.object.isRequired,
  users: PropTypes.array
};

export default PostsTable;
