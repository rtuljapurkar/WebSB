import React from 'react';
import TextInput from '../common/TextInput';
import {Button, Glyphicon} from 'react-bootstrap';

const PostForm = ({post, onSave, onChange, saving, errors, venue}) => {
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
      <TextInput
        name="Text"
        label="Text"
        value={post.Text}
        onChange={onChange}
        error={errors.Text}/>

        <TextInput
          name="Stars"
          label="Stars"
          value={post.Stars}
          onChange={onChange}
          error={errors.Stars}/>

      {/* <TextInput
        name="category"
        label="Category"
        value={post.category}
        onChange={onChange}
        error={errors.category}/>

      <TextInput
        name="length"
        label="Length"
        value={post.length}
        onChange={onChange}
        error={errors.length}/> */}

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

PostForm.propTypes = {
  post: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  venue: React.PropTypes.object
};

export default PostForm;
