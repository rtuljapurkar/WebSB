import React from 'react';
import TextInput from '../common/TextInput';
// import {Button, Glyphicon} from 'bootstrap';
import {PropTypes} from 'prop-types';

const LoginForm = ({credentials, onSave, onChange, saving, errors}) => {
  return (
            <form>
              <h1>Log-in</h1>
              <TextInput
                name="PEmailA1"
                label="Email Or Username"
                value={credentials.email}
                onChange={onChange}
                error={errors.PEmailA1}/>

              <TextInput
                name="PPassword"
                label="password"
                type="password"
                value={credentials.password}
                onChange={onChange}
                error={errors.PPassword}/>

                <input
                  type="submit"
                  disabled={saving}
                  value={saving ? 'Logging in...' : 'Log In'}
                  className="btn btn-primary"
                  onClick={onSave}
                  error={errors.PUserName}/>


                <div style={{"paddingTop":"15px"}}>
                    <label>Need An Account?&nbsp;&nbsp;</label>
                    <a href={"/register"} className="btn btn-primary">
                            Register
                    </a>
                </div>
            </form>
          );
};

LoginForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default LoginForm;
