import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../actions/sessionActions';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class  Header extends React.Component {
 constructor(props) {
    super();
    this.logOut = this.logOut.bind(this);
  }

 logOut(event) {
   event.preventDefault();
   this.props.actions.logOutUser();
 }

render(){
        if (this.props.logged_in === true) {
        return (
                    <nav>
                            <IndexLink to="/" activeClassName="active">Home</IndexLink>
                                {" | "}
                                <Link to="/venues" activeClassName="active">Venues</Link>
                                 {" | "}
                                 <Link to="/teams" activeClassName="active">Teams</Link>
                                  {" | "}
                                  <Link to="/posts" activeClassName="active">Posts</Link>
                                   {" | "}
                                <Link to="/about" activeClassName="active">About</Link>
                                  {" | "}
                                  <Link to="/about" activeClassName="active">Help</Link>
                                  {" | "}
                                <a href="/logout" onClick={this.logOut}>log out {localStorage.username}</a>
                     </nav>
                );
            }
            else
            {
                return (

                         <nav>
                            <IndexLink to="/" activeClassName="active">Home</IndexLink>
                            {" | "}
                            <Link to="/venues" activeClassName="active">Venues</Link>
                             {" | "}
                             <Link to="/teams" activeClassName="active">Teams</Link>
                              {" | "}
                              <Link to="/posts" activeClassName="active">Posts</Link>
                               {" | "}
                            <Link to="/about" activeClassName="active">About</Link>
                              {" | "}
                              <Link to="/about" activeClassName="active">Help</Link>
                              {" | "}
                             <Link to="/login" activeClassName="active">log in</Link>
                        </nav>
                    );
                }
    }
}

// Header.propTypes = {
//   loading: PropTypes.bool.isRequired
// };

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  logged_in: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {logged_in: state.session.isUserLoggedIn};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
