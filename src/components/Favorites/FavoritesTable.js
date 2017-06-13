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
        <div className="blackBg">
            <div style={{"backgroundColor":"#ffcb45","fontFamily": "Montserrat, sans-serif",
                "fontSize":"12px", "fontWeight":"bold", "marginBottom":"10px", "wordBreak":"normal" , "color":"#262626","textAlign":"center" }}>
                  <Link id="amenitiesnav" to={"/amenities/"+venueID}>{vname}</Link>
             </div>
             <div className="break">
                 &nbsp;
             </div>
        </div>
  );
};

FavoritesTable.propTypes = {
  favorite: PropTypes.object.isRequired,
  venueID: PropTypes.number,
  venues: PropTypes.object
};

export default FavoritesTable;

/*
<tr key={favorite.ID}>
          <td className="blackBg"><a className="blackBg" href={"/amenities/"+venueID}>{vname}</a></td>
</tr>
*/
