import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import VenuePage from './VenuePage';

const VenueListItem = ({venue}) => {
  return (
                <tr key={venue.id}>
                  <td>
                      <a href={"/venue/show/" + venue.id}>
                         {venue.VName}
                      </a>
                  </td>
                  <td>{venue.VAddress}</td>
                  <td>{venue.VCity}</td>
                  <td><img src={venue.VImage} alt={venue.VName}
                        height="80" width="80"/></td>
              </tr>
  );
};

VenueListItem.propTypes = {
  venue: PropTypes.object.isRequired
};

export default VenueListItem;
