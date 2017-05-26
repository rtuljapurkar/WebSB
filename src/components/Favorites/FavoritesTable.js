import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const FavoritesTable = ({favorite, venueID, venues}) => {
  let vname = "";
  if(isNaN(venueID))
  {
    venueID = 0;
    vname = "";
  }
  try{
    vname = venues.data[venueID-1].VName;
  }
  catch(ex) {
    vname = "";
  }
  return (
        <tr key={favorite.ID}>
                  <td className="blackBg"><a href={"/amenities/"+venueID}>{vname}</a></td>
        </tr>
  );
};

FavoritesTable.propTypes = {
  favorite: PropTypes.object.isRequired,
  venueID: PropTypes.number,
  venues: PropTypes.object
};

export default FavoritesTable;
