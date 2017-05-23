import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const TeamListItem = ({team}) => {
  return (
                <tr key={team.id}>
                  <td>
                      <a href={"/team/show/" + team.id}>
                         {team.Name}
                      </a>
                  </td>
                  <td>{team.League}</td>
                  <td>{team.Description}</td>
                  <td>{team.Tags}</td>
                  <td><img src={team.Logo} alt={team.Name}
                        height="80" width="80"/></td>
              </tr>
  );
};

TeamListItem.propTypes = {
  team: PropTypes.object.isRequired
};

export default TeamListItem;
