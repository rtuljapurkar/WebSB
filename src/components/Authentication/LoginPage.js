import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../../actions/sessionActions';
import {Link, browserHistory} from 'react-router';

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {credentials: {PEmailA1: '', PPassword: ''}};
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSave(event) {
    event.preventDefault();
    //debugger;
    this.props.actions.loginUser(this.state.credentials);

  }

  render() {

        if(this.props.session === true)
        {
            browserHistory.push('/venues');
            return (<h1>Welcome to SB</h1>);
        }
        else {
            return (
                    <div className="row .top-buffer" >
                      <form>
                        <TextInput
                          name="PEmailA1"
                          label="email"
                          value={this.state.credentials.email}
                          onChange={this.onChange}/>

                        <TextInput
                          name="PPassword"
                          label="password"
                          type="password"
                          value={this.state.credentials.password}
                          onChange={this.onChange}/>

                        <input
                          type="submit"
                          className="btn btn-primary"
                          onClick={this.onSave}/>
                          {" "}
                      </form>
                  </div>
              );
            }
  }
}

LogInPage.propTypes = {
    actions: React.PropTypes.object.isRequired,
    session: React.PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}
function mapStateToProps(state, ownProps) {
    return {
        session: state.session
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
