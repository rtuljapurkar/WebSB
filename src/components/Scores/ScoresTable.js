import React  from 'react';
import {Link} from 'react-router';
import {PropTypes} from 'prop-types';

const ScoresTable = ({score}) => {
  return (
           <div className="blackBg">
               <div style={{"backgroundColor":"#ffcb45","fontFamily": "Montserrat, sans-serif",
                   "fontSize":"12px", "fontWeight":"bold", "marginBottom":"10px", "wordBreak":"normal" , "color":"#262626","textAlign":"center" }}>
                        {score.League} <br/>
                        {score.VName}  <br/>
                        <b>{score.Status}</b>
                </div>
               <div style={{"marginBottom":"10px", "textAlign":"center"}}>
                   <div>
                       <div style={{"float":"left", "width": "50%", "textAlign":"center" }}>
                           <img src={score.HomeLogo} alt={score.HomeTeam}
                             height="20" width="20"/><br/>
                             {score.HomeTeam}
                         </div>
                         <div style={{"float":"right" , "width": "50%", "textAlign":"center"}}>
                             <img src={score.AwayLogo} alt={score.AwayTeam}
                              height="20" width="20"/><br/> {score.AwayTeam}
                        </div>
                   </div>
                   <div style={{"clear":"both"}}>
                       <div style={{"float":"left", "width": "50%", "textAlign":"center" }}>
                             {(score.HPoints > score.APoints) && <b style={{"color":"#ffcb45"}}>{score.HPoints}</b>}
                             {(score.HPoints <= score.APoints) && <b>{score.HPoints}</b>}
                         </div>
                         <div style={{"float":"right" , "width": "50%", "textAlign":"center"}}>
                             {(score.APoints > score.HPoints) && <b style={{"color":"#ffcb45"}}>{score.APoints}</b>}
                             {(score.APoints <= score.HPoints) && <b>{score.APoints}</b>}
                        </div>
                   </div>
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
