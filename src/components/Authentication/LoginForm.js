import React from 'react';
import TextInput from '../common/TextInput';
import {Button, Glyphicon} from 'react-bootstrap';

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
                    <a href={"/register"}>
                        <Button bsize="xsmall" className="btn btn-primary">
                            Register <Glyphicon glyph="Register"/>
                        </Button>
                    </a>
                </div>
            </form>
          );
};

LoginForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  credentials: React.PropTypes.object.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LoginForm;
