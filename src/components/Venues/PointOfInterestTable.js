import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {Button, Glyphicon, SplitButton, MenuItem} from 'react-bootstrap';

//import '../../styles/fixed-data-table.css';
//import {Button, Glyphicon} from 'react-bootstrap';

 //  --------------------------------------------------------------------------------------------------------------//
const PointOfInterestTable = ({ PointOfInterest, venue }) => {
    let id = PointOfInterest["id"];
    let rows = [];
    for (let key in PointOfInterest)
    {
      if (PointOfInterest.hasOwnProperty(key) && key!= "id" && key!= "VenueID" && key!= "Active" && key!= "POIGPSLoc" && key!= "POIImage") {
                let value = PointOfInterest[key] == null ? "": PointOfInterest[key];
                let modifiedkey = key.substr(3);
                if(modifiedkey == "Name"){
                    rows.push(<p style={{"fontSize":"24px"}}><b>{value}</b></p>);
                    rows.push(<a href={"/posts/poi/add/"+id}>
                                    <Button bsStyle="primary" bsSize="small" >
                                        <Glyphicon glyph="pencil" />  Review
                                    </Button>
                                </a>);
                }
                else
                 {
                    rows.push(<span>{modifiedkey}: {value}<br/> </span>);
                }
          }
     }

    return (
                <tr >
                   <td  className="blackBg" >
                      {rows}
                  </td>
                  <td>
                     <img src={PointOfInterest["POIImage"]} height="200" width="200" alt=""   />
                  </td>
                </tr>
    );
};

PointOfInterestTable.propTypes = {
  sortBy: PropTypes.func,
  filterBy: PropTypes.func,
  // state data
  data: PropTypes.array,
  filterString: PropTypes.string,
  sortKey: PropTypes.string,
  sortDesc: PropTypes.bool,
  pointOfInterests: PropTypes.object,
  actions:PropTypes.object,
  PointOfInterest: PropTypes.object,
  venue: PropTypes.object
};


export default PointOfInterestTable;
