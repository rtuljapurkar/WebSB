import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../../actions/sessionActions';
import {Link, browserHistory} from 'react-router';
import {Button, Glyphicon} from 'react-bootstrap';
import toastr from 'toastr';

class LogInPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {credentials: {PEmailA1: '', PPassword: ''}};
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    if(this.props.session.isUserLoggedIn === true)
    {
        browserHistory.push('/venues');
        return (<h1>Welcome to SB</h1>);
    }
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
    this.props.actions.loginUser(this.state.credentials)
    .then(() => this.redirect())
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });

  }

    redirect() {
      this.setState({saving: false});
      toastr.success('Login Successful');
      this.context.router.push('/home');
    }


  render() {
       //console.log("login_render");
        //console.log(this.props);
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


                          <div style={{"paddingTop":"15px"}}>
                              <label>Need An Account?&nbsp;&nbsp;</label>
                              <a href={"/register"}>
                                  <Button bsize="xsmall" className="btn btn-primary">
                                      Register <Glyphicon glyph="Register"/>
                                  </Button>
                              </a>
                          </div>
                      </form>


                  </div>
              );
            }

}

LogInPage.propTypes = {
    actions: React.PropTypes.object.isRequired,
    session: React.PropTypes.object.isRequired
};

LogInPage.contextTypes = {
  router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}
function mapStateToProps(state, ownProps) {
    //console.log("login_mapstate");
    //console.log(state);
    return {
        session: state.session
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
