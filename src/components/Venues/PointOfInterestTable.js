import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import '../../styles/fixed-data-table.css';
import {Button, Glyphicon} from 'react-bootstrap';

// function MixedCell ({data, rowIndex, columnKey}) {
//     let id = data[rowIndex]["id"];
//     let rows = [];
//     for (let key in data[rowIndex])
//     {
//       if (data[rowIndex].hasOwnProperty(key)
//             && key!= "id" && key!= "VenueID" && key!= "Active" && key!= "POIGPSLoc"
//         ) {
//                 let value = data[rowIndex][key] == null ? "": data[rowIndex][key];
//                 let modifiedkey = key.substr(3);
//                 if(modifiedkey == "Name"){
//                     rows.push(<p style={{"fontSize":"24px"}}><b>{value}</b></p>);
//                 }
//                 else
//                  {
//                     rows.push(<p>{modifiedkey}: {value} </p>);
//
//                 }
//
//           }
//       }
//  return  (<Cell style={{"border":"solid 1px #000", "paddingRight": "10px"}}>
//              <table style={{"tableLayout": "fixed" }}>
//                  <tbody>
//                    <tr >
//                      <td style={{"fontWeight": "bold", "paddingLeft": "10px", "fontSize": "14px",
//                          "wordWrap":"break-word", "fontFamily": "Helvetica",  "width":"800px"}}>
//                             {rows}
//                      </td>
//                    </tr>
//                  </tbody>
//              </table>
//          </Cell>
//          );
// }


// MixedCell.propTypes = {
//   data: PropTypes.array.isRequired,
//   rowIndex: PropTypes.number,
//   columnKey: PropTypes.string
// };


//  --------------------------------------------------------------------------------------------------------------//
const PointOfInterestTable = ({ PointOfInterest }) => {
    let id = PointOfInterest["id"];
    let rows = [];
    for (let key in PointOfInterest)
    {
      if (PointOfInterest.hasOwnProperty(key) && key!= "id" && key!= "VenueID" && key!= "Active" && key!= "POIGPSLoc") {
                let value = PointOfInterest[key] == null ? "": PointOfInterest[key];
                let modifiedkey = key.substr(3);
                if(modifiedkey == "Name"){
                    rows.push(<p style={{"fontSize":"24px"}}><b>{value}</b></p>);
                }
                else
                 {
                    rows.push(<span>{modifiedkey}: {value}<br/> </span>);
                }
          }
     }

    return (
                <tr className="blackBg">
                   <td className="blackBg"  >
                      {rows}
                  </td>
                </tr>
    );
};

PointOfInterestTable.propTypes = {
  sortBy: PropTypes.func.isRequired,
  filterBy: PropTypes.func.isRequired,
  // state data
  data: PropTypes.array.isRequired,
  filterString: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  pointOfInterests: PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired,
  PointOfInterest: PropTypes.object.isRequired
};


export default PointOfInterestTable;
