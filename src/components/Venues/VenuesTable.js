import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {Button, Glyphicon} from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {Link} from 'react-router';

// Stateless cell components for Table component
function renderSortArrow (sortKey, sortDesc, sortId) {
  return sortKey === sortId ? (sortDesc ? '↓' : '↑') : '';
}

//  --------------------------------------------------------------------------------------------------------------//
const VenuesTable = ({venue, venues }) => {
    return (
        <div className="blackBg">
            <div className="ib" >
                <div className="ib" style={{"max-width":"100%"}}>
                      {venue["VName"]} <br/>
                      {venue["VCity"]}
                </div>
                <div className="ib" style={{"max-width":"100%"}}>
                    {venue["VDescription"]}
                </div>
                <div className="ib" style={{"max-width":"100%"}}>
                    <div className="ibInline">
                            <Link to={"/amenities/"+venue.id}>
                                <Button bsStyle="primary" bsSize="small"  >
                                    <Glyphicon glyph="pencil" />  Amenities
                                </Button>
                            </Link>
                     </div>
                     <div className="ibInline">
                             <Link to={"/poi/"+venue.id}>
                                    <Button bsStyle="primary" bsSize="small"  >
                                        <Glyphicon glyph="pencil" />  Local 411
                                    </Button>
                                </Link>
                     </div>
                     <div className="ibInline">
                         <a href={"/posts/add/"+venue.id}>
                                   <Button bsStyle="primary" bsSize="small" >
                                       <Glyphicon glyph="pencil" />  Review this Stadium
                                   </Button>
                          </a>
                     </div>
                </div>
            </div>
            <div className="ibright">
                <a href={"/venues/"+venue.id}>
                 <img src={venue["VImage"]} height="200" width="200" alt=""   />
                 </a>
            </div>
            <div className="break">&nbsp;</div>
        </div>
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
