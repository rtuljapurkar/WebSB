import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {Button, Glyphicon, SplitButton, MenuItem} from 'react-bootstrap';

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
                        rowHeader.push(<b key={id} style={{"fontSize":"24px"}}>{value}</b> );
                        buttonRow.push(<a key={id} href={"/posts/amenities/add/"+id}>
                                        <Button bsStyle="primary" bsSize="small" >
                                            <Glyphicon glyph="pencil" />  Review
                                        </Button>
                                    </a>);
                    }
                    else if(modifiedkey == "Image"){
                            rowImage.push(<img src={value} key={id} height="200" width="200" alt=""/>);
                    }
                    else
                     {
                        rows.push(<span key={modifiedkey+id}  className="spanAmenities">{modifiedkey}: {value}<br/> </span>);
                    }

                }
          }
   }

    return (
             <div className="blackBg">
                    <div className="ib" >{rowHeader}</div>
                    <div className="ibright">{buttonRow}</div>
                    <div className="ib">{rows}</div>
                    <div className="ibright">{rowImage}</div>
                    <div className="break">&nbsp;</div>
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
export default AmenitiesTable;
