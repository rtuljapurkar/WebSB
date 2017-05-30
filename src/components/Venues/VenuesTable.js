import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {Button, Glyphicon} from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// Stateless cell components for Table component
function renderSortArrow (sortKey, sortDesc, sortId) {
  return sortKey === sortId ? (sortDesc ? '↓' : '↑') : '';
}

//  --------------------------------------------------------------------------------------------------------------//
const VenuesTable = ({venue, venues }) => {
    return (
        <tr >
              <td className="blackBg" >
                  <table className="col-md-12 mainScreen " >
                      <tbody style={{"height":"200px", "overflow":"hidden"}} >
                      <tr  style={{"height":"75px"}}>
                          <td>
                              {venue["VName"]} <br/>
                              {venue["VCity"]}
                          </td>
                      </tr>
                      <tr>
                          <td  style={{"height":"75px"}}>
                            {venue["VDescription"]}
                          </td>
                      </tr>
                      <tr className="col-md-12">
                          <td>
                              <span>&nbsp;&nbsp;&nbsp;</span>
                              <span style={{"float":"left"}}>
                                  <a href={"/posts/add/"+venue.id}>
                                          <Button bsStyle="primary" bsSize="small" >
                                              <Glyphicon glyph="pencil" />  Review this Stadium
                                          </Button>
                                  </a>
                             </span>
                             <span>&nbsp;&nbsp;&nbsp;</span>
                              <a href={"/poi/"+venue.id}>
                                      <Button bsStyle="primary" bsSize="small"  >
                                          <Glyphicon glyph="pencil" />  Local 411
                                      </Button>
                                 </a>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                                    <span style={{"float":"right"}}>
                                          <a href={"/amenities/"+venue.id}>
                                              <Button bsStyle="primary" bsSize="small"  >
                                                  <Glyphicon glyph="pencil" />  Amenities
                                              </Button>
                                          </a>
                                    </span>
                          </td>
                      </tr>
                      </tbody>
                </table>
              </td>
              <td>
                 <img src={venue["VImage"]} height="200" width="200" alt=""   />
              </td>
        </tr>
    );

};

VenuesTable.propTypes = {
  // actions
  //fetchData: PropTypes.func.isRequired,
  sortBy: PropTypes.func,
  filterBy: PropTypes.func,

  // state data
  data: PropTypes.array,
  filterString: PropTypes.string,
  sortKey: PropTypes.string,
  sortDesc: PropTypes.bool,
  venues: PropTypes.array,
  actions:PropTypes.object,
  venue:PropTypes.object
};

export default VenuesTable;
