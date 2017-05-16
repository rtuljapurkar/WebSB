import React from 'react';
import TextInput from '../common/TextInput';
import {Button, Glyphicon} from 'react-bootstrap';

const RegisterForm = ({user, onSave, onChange, saving, errors, venue}) => {
  return (
    <form>
      <h1>Register</h1>
            <TextInput
                name="PEmailA1"
                label="Email"
                value={user.PEmailA1}
                onChange={onChange}
                error={errors.PEmailA1}/>

            <TextInput
                name="PUserName"
                label="Username"
                value={user.PUserName}
                onChange={onChange}
                error={errors.PUserName}/>

            <TextInput
                name="PPassword"
                label="Password"
                value={user.PPassword}
                onChange={onChange}
                error={errors.PPassword}/>

            <TextInput
                name="PPasswordConfirm"
                label="Confirm Password"
                value={user.PPasswordConfirm}
                onChange={onChange}
                error={errors.PPasswordConfirm}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

RegisterForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  venue: React.PropTypes.object
};

export default RegisterForm;
