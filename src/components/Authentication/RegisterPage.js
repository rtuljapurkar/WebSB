import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../actions/sessionActions';
import RegisterForm from './RegisterForm';
import toastr from 'toastr';
import {Link, browserHistory} from 'react-router';
import {PropTypes} from 'prop-types';

function validateEmail (email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}

class RegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign({}, props.user),
      errors: {},
      saving: false};
    this.updateUserState = this.updateUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  userFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if ( (this.state.user.PEmailA1 == "") ||
            !validateEmail(this.state.user.PEmailA1) )
    {
      errors.PEmailA1 = 'Valid email address must be entered';
      formIsValid = false;
    }
    if (this.state.user.PUserName == "") {
      errors.PUserName = 'Username must be entered';
      formIsValid = false;
    }
    if ((this.state.user.PPassword == "") || (this.state.user.PPassword.length < 7)|| (this.state.user.PPassword.length > 15)){
      errors.PPassword = 'Password must be between 7 and 15 characters';
      formIsValid = false;
    }
    if (this.state.user.PPasswordConfirm == "" || (this.state.user.PPasswordConfirm != this.state.user.PPassword )) {
      errors.PPasswordConfirm = 'Confirm password and password must match';
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  userNameAndOrEmailTaken() {
    let formIsValid = true;
    let errors = {};

    this.props.actions.isEmailTaken(this.state.user.PEmailA1)
    .then(resp => {
             if(resp) {
                         errors.PEmailA1 = 'Email is already registered';
                         this.setState({errors: errors});
                         formIsValid = false;
                     }
              this.props.actions.isUserNameTaken(this.state.user.PUserName)
              .then(resp2 => {
                               if(resp2) {
                                       errors.PUserName = 'Username is already registered';
                                       this.setState({errors: errors});
                                       formIsValid = false;
                                    }
                               else{
                                       this.props.actions.saveUser(this.state.user)
                                       .then(
                                           () => this.redirect()
                                       )
                                       .catch(error => {
                                               toastr.error(error);
                                               this.setState({saving: false});
                                        });
                                 }
                             }
                    )
                     .catch(error => {
                         formIsValid = false;
                         toastr.error(error);
                         this.setState({saving: false});
                     });

     })
    .catch(error => {
        formIsValid = false;
        toastr.error(error);
        this.setState({saving: false});
    });
    return formIsValid;
  }

  saveUser(event) {
    event.preventDefault();
    if (!this.userFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    if (!this.userNameAndOrEmailTaken()) {
        return;
    }
    this.setState({saving: false});
  }

  redirect() {
    //this.setState({saving: false});
    toastr.success('Registration Successful');
    //browserHistory.push('/venues');
     window.location = "/home";
  }

  render() {
    return (
      <RegisterForm
        user={this.state.user}
        onChange={this.updateUserState}
        onSave={this.saveUser}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

RegisterPage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  params:  PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
RegisterPage.contextTypes = {
  router: PropTypes.object
};

function getUserById(users, id) {
  const user = users.filter(user => user.id == id);
  if (user) return user[0]; //since filter returns an array, have to grab the first.
  return null;
}


function mapStateToProps(state, ownProps) {
  return {
        user: state.session.user
    };

}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
