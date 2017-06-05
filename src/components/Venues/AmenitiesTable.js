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
  let rowHeader = [];
  let rows = [];
  let rowImage = [];
  let buttonRow = [];
  let parkingFields = ['AName', 'AImage', 'ASection','AType','ATags','ACost','ADistance','AWalkingTime','ALotLocation'];
  let foodFields = ['AName', 'AImage', 'AType', 'ASection','AChildAmenity','AMainFood','AVeggieFood','AVeganFood', 'AGFFood',
                        'ABeverages','ADomesticBeer','ACraftBeer','AMixedDrinks'];
  let informationFields = ['AName', 'AImage', 'ASection','AType','ATags'];
  let merchandiseFields = ['AName', 'AImage', 'ASection','AType','ACost','ATags'];
  let restroomsFields = ['AName', 'AImage', 'AChildAmenity', 'ASection','AType', 'ATags'];

  for (let key in Amenity)
  {
      if (Amenity.hasOwnProperty(key)
            && key!= "id" && key!= "VenueID" && key!= "ASubType" && key!= "Active"
        ) {
                 if( (Amenity["AType"].toLowerCase() == "parking" && parkingFields.indexOf(key) != -1) ||
                     (Amenity["AType"].toLowerCase() == "food and beverage" && foodFields.indexOf(key) != -1)  ||
                     (Amenity["AType"].toLowerCase() == "information" && informationFields.indexOf(key) != -1)  ||
                     (Amenity["AType"].toLowerCase() == "merchandise" && merchandiseFields.indexOf(key) != -1)  ||
                      (Amenity["AType"].toLowerCase() == "restrooms" && restroomsFields.indexOf(key) != -1)  ||
                     (  Amenity["AType"].toLowerCase() != "parking"
                        && Amenity["AType"].toLowerCase() != "food and beverage"
                        && Amenity["AType"].toLowerCase() != "information"
                        && Amenity["AType"].toLowerCase() != "merchandise"
                        && Amenity["AType"].toLowerCase() != "restrooms")
                    )
                 {

                    let value = Amenity[key] == null ? "": Amenity[key];
                    let modifiedkey = key.substr(1);
                    if(modifiedkey == "Name"){
                        rowHeader.push(<b style={{"fontSize":"24px"}}>{value}</b> );
                        buttonRow.push(<a href={"/posts/amenities/add/"+id}>
                                        <Button bsStyle="primary" bsSize="small" >
                                            <Glyphicon glyph="pencil" />  Review
                                        </Button>
                                    </a>);
                    }
                    else if(modifiedkey == "Image"){
                            rowImage.push(<img src={value} height="200" width="200" alt=""/>);
                    }
                    else
                     {
                        rows.push(<span className="spanAmenities">{modifiedkey}: {value}<br/> </span>);
                    }

                }
          }
   }

    return (
            //   <tr className="blackBg">
            //      <td className="blackBg">
            //         {rows}
            //     </td>
            //   </tr>
             <div className="blackBg">
                    <div className="ib">{rowHeader}</div>
                    <div className="ibright">{buttonRow}</div>
                    <div className="ib">{rows}</div>
                    <div className="ibright">{rowImage}</div>
                    <div className="break"></div>
             </div>

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
