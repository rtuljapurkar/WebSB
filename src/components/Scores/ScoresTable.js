import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const ScoresTable = ({score}) => {
  return (
           <div className="blackBg">
               <div style={{"backgroundColor":"#ffcb45","font-family": "Montserrat, sans-serif",
                   "font-size":"12px", "font-weight":"bold", "margin-bottom":"10px", "word-break":"normal" , "color":"#262626","textAlign":"center" }}>
                        {score.League} <br/>
                        {score.VName}  <br/>
                        <b>{score.Status}</b>
                </div>
               <div style={{"margin-bottom":"10px", "textAlign":"center"}}>
                         <img src={score.HomeLogo} alt={score.HomeTeam}
                               height="20" width="20"/>&nbsp; {score.HomeTeam }&nbsp;&nbsp;
                               {(score.HPoints > score.APoints) && <b style={{"color":"#ffcb45"}}>{score.HPoints}</b>}
                               {(score.HPoints <= score.APoints) && <b>{score.HPoints}</b>}
                               <br/>
                          <img src={score.AwayLogo} alt={score.AwayTeam}
                                 height="20" width="20"/>&nbsp; {score.AwayTeam }&nbsp;&nbsp;
                                {(score.APoints > score.HPoints) && <b style={{"color":"#ffcb45"}}>{score.APoints}</b>}
                                {(score.APoints <= score.HPoints) && <b>{score.APoints}</b>}
                </div>
                <div className="break">
                    &nbsp;
                </div>
            </div>
  );
};

ScoresTable.propTypes = {
  score: PropTypes.object.isRequired
};

export default ScoresTable;

/*
<tr key={score.ID}>
         <td className="blackBg" >
              <img src={score.HomeLogo} alt={score.HomeTeam}
                    height="20" width="20"/> {" " + score.HomeTeam + " : "} <b>{score.HPoints}</b> <br/>
               <img src={score.AwayLogo} alt={score.AwayTeam}
                      height="20" width="20"/>{" " +score.AwayTeam + " : "}<b>{score.APoints}</b>
         </td>
 </tr>
*/
