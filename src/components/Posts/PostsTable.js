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
    if(isNaN(venueID))
    {
      venueID = 0;
    }
    try{
      vname = venues.data[venueID].VName;
    }
    catch(ex) {
      vname = "";
    }

    try{
      userImage = users[userName].PUserImage;
    }
    catch (ex) {
     userImage = "";
    }
    console.log(userImage);
    return (
            <tr>
                  <td className="blackBg">
                      <table className="col-md-12 mainScreen">
                          <tr>
                              {userImage =="" &&
                                      <td style={{"width":"10%"}}>
                                          <img src= {require('../../images/favicon.ico')}
                                           width="30" height="30" alt="logo"/>
                                      </td>}
                                  {userImage !="" &&
                                          <td style={{"width":"10%"}}>
                                              <img src= {userImage}
                                               width="30" height="30" alt=""/>
                                          </td>}
                              <td style={{"width":"90%"}}>
                                    {post["UserName"]} <br/>
                                    <ReactStars
                                    name={name}
                                    count={5}
                                    className="form-control"
                                    size={24}
                                    edit={false}
                                    value={post["Stars"]}
                                    color2={'#ffd700'} />
                              </td>
                          </tr>
                          <tr>
                              <td colSpan="2" >
                                     {vname} <br/><br/><br/>
                                     {post["Text"]} <br/><br/><br/>
                                    <span style={{"textAlign":"Right"}}> Posted {postedTime}<br/></span>
                              </td>
                          </tr>
                    </table>
                  </td>
                  <td>
                    <img src={post["Image"]} height="200" alt="" width="200" />
                  </td>
            </tr>
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
  venues: PropTypes.object,
  post: PropTypes.object.isRequired,
  users: PropTypes.object
};

export default PostsTable;
