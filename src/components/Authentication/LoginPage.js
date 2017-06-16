import React from 'react';
import TextInput from '../common/TextInput';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../../actions/sessionActions';
import {Link, browserHistory} from 'react-router';
import toastr from 'toastr';
import LoginForm from './LoginForm';
import {PropTypes} from 'prop-types';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {credentials: {PEmailA1: '', PPassword: ''},
    errors: {}};
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.userFormIsValid = this.userFormIsValid.bind(this);
    //this.validateEmail = this.validateEmail.bind(this);
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

  // validateEmail (email) {
  //         let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //         return re.test(email);
  // }

  userFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.credentials.PEmailA1 == "") {
      errors.PEmailA1 = 'Email address or username must be entered';
      formIsValid = false;
    }

    // if (this.state.user.PUserName == "") {
    //   errors.PUserName = 'Username is required';
    //   formIsValid = false;
    // }
    if (this.state.credentials.PPassword == "") {
      errors.PPassword = 'Password is required';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  onSave(event) {
    event.preventDefault();
    if (!this.userFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    this.props.actions.loginUser(this.state.credentials)
    .then(
            () => this.redirect()
        )
    .catch(error => {
          toastr.error(error);
          this.setState({saving: false});
    });
  }

    redirect() {
          this.setState({saving: false});
          toastr.success('Login Successful');
          //this.context.router.push('/home');
          window.location = "/home";
    }


  render() {
      if(this.props.session.isUserLoggedIn === true)
      {
          browserHistory.push('/venues');
          return (<h1>Welcome to SB</h1>);
      }
        return (
                <LoginForm
                  credentials={this.state.credentials}
                  onChange={this.onChange}
                  onSave={this.onSave}
                  errors={this.state.errors}
                  saving={this.state.saving}
                />
              );
            }

}

LoginPage.propTypes = {
    actions: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired
};

LoginPage.contextTypes = {
  router: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
