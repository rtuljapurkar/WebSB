import React from 'react';
import TextInput from '../common/TextInput';
import {Button, Glyphicon} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

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
                type="password"
                value={user.PPassword}
                onChange={onChange}
                error={errors.PPassword}/>

            <TextInput
                name="PPasswordConfirm"
                label="Confirm Password"
                type="password"
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
  user: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
  venue: PropTypes.object
};

export default RegisterForm;
