import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const ScoresTable = ({score}) => {
  return (
        <tr key={score.ID}>
            <td className="blackBg" >
                 <img src={score.HomeLogo} alt={score.HomeTeam}
                       height="20" width="20"/> {score.HomeTeam + " : "} <b>{score.HPoints}</b> <br/>
                 <img src={score.AwayLogo} alt={score.AwayTeam}
                         height="20" width="20"/>{score.AwayTeam + " : "}<b>{score.APoints}</b>
            </td>
        </tr>
  );
};

ScoresTable.propTypes = {
  score: PropTypes.object.isRequired
};

export default ScoresTable;
