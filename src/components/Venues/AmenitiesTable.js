import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {Button, Glyphicon, SplitButton, MenuItem} from 'react-bootstrap';



// function MixedCell ({data, rowIndex, columnKey}) {
//     let id = data[rowIndex]["id"];
//     let rows = [];
//     for (let key in data[rowIndex])
//     {
//       if (data[rowIndex].hasOwnProperty(key)
//             && key!= "id" && key!= "VenueID" && key!= "ASubType" && key!= "Active"
//             && key!= "AImage"
//         ) {
//                 let value = data[rowIndex][key] == null ? "": data[rowIndex][key];
//                 let modifiedkey = key.substr(1);
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
//              <tbody>
//                <tr >
//                  <td style={{"fontWeight": "bold", "paddingLeft": "10px", "fontSize": "14px",
//                      "wordWrap":"break-word", "fontFamily": "Helvetica",  "width":"800px"}}>
//                         {rows}
//                  </td>
//                </tr>
//              </tbody>
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
const AmenitiesTable = ({ Amenity }) => {
  let id = Amenity["id"];
  let rows = [];
  for (let key in Amenity)
  {
      if (Amenity.hasOwnProperty(key)
            && key!= "id" && key!= "VenueID" && key!= "ASubType" && key!= "Active"
            && key!= "AImage"
        ) {
                let value = Amenity[key] == null ? "": Amenity[key];
                let modifiedkey = key.substr(1);
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
                 <td className="blackBg">
                    {rows}
                </td>
              </tr>
    );

};

AmenitiesTable.propTypes = {
  sortBy: PropTypes.func,
  filterBy: PropTypes.func,
  // state data
  data: PropTypes.array,
  filterString: PropTypes.string,
  filterType: PropTypes.string,
  sortKey: PropTypes.string,
  sortDesc: PropTypes.bool,
  amenities: PropTypes.object,
  actions:PropTypes.object,
  Amenity: PropTypes.object
};

// SortHeaderCell.propTypes = {
//   sortBy: PropTypes.func.isRequired,
//   sortKey: PropTypes.string.isRequired,
//   sortDesc: PropTypes.bool.isRequired,
//   columnKey: PropTypes.string,
//   children: PropTypes.element.isRequired
// };
export default AmenitiesTable;
