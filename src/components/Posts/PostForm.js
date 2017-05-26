import React from 'react';
import TextInput from '../common/TextInput';
import StarInput from '../common/StarInput';
import {Button, Glyphicon} from 'react-bootstrap';
//import {glyphicon} from 'react-router';
import ReactStars from 'react-stars';

const PostForm = ({post, onSave, onChange, saving, errors, venue, onCancel, onStarRatingChange}) => {
  return (
    <form>
      <h1>Add Post</h1>
      <table style={{"border":"solid 1px #000", "tableLayout": "fixed", "paddingRight": "10px" }}>
          <tbody>
            <tr style={{"backgroundColor": "black"}} >
              <td style={{"fontWeight": "bold", "color": "white", "paddingLeft": "10px", "fontSize": "14px",
                  "wordWrap":"break-word",  "fontFamily": "Helvetica",  "width":"600px"}}>
                {venue.VName} <br/>
                {venue.VCity}
              </td>
              <td rowSpan="3"  style={{"paddingLeft": "15px"}}>
                <img src={venue.VImage} height="200" alt="" width="200" />
              </td>
            </tr>
            <tr style={{"backgroundColor": "black" }}>
              <td style={{"color": "white", "paddingLeft": "10px", "fontFamily": "Helvetica", "fontSize": "14px",
                             "wordWrap":"break-word"}}>
                {venue.VDescription}
              </td>
            </tr>
          </tbody>
      </table>
 <table style={{"width":"300px" }}>
     <tbody>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="Text"
                   label="Text"
                   value={post.Text}
                   onChange={onChange}
                   error={errors.Text}/>
             </td>
         </tr>
         <tr>
             <td className="col-md-2">
                 <StarInput
                   name="Stars"
                   label="Star Rating"
                   value={post.Stars}
                   onChange={onStarRatingChange}
                   error={errors.Stars}/>
             </td>
         </tr>
         <tr>
             <td className="col-md-2">
                 <input
                   type="submit"
                   disabled={saving}
                   value={saving ? 'Saving...' : 'Save'}
                   className="btn btn-primary"
                   onClick={onSave}/>

                   &nbsp;&nbsp;
                   <input style={{"width":"80px"}}
                     disabled={saving}
                     value={'Cancel'}
                     className="btn btn-danger"
                     onClick={onCancel}/>
             </td>
         </tr>
     </tbody>
 </table>

    </form>
  );
};

PostForm.propTypes = {
  post: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  venue: React.PropTypes.object,
  onStarRatingChange: React.PropTypes.func.isRequired
};

export default PostForm;
