import React, {PropTypes} from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
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
   browserHistory.push("/");
 }



render(){
        if (this.props.logged_in === true) {
        return (
            <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="http://www.stadiumbee.com"><span style={{"color":"white", "fontFamily":"Montserrat"}}>Stadium</span><span style={{"color":"yellow"}}>Bee</span></a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <ul className="nav navbar-nav">
                             <li className="nav active"><a href="/">Home</a></li>
                             <li className="nav"><a href="/venues">Venues</a></li>
                             <li className="nav"><a href="/teams">Teams</a></li>
                             <li className="nav"><a href="/posts">Posts</a></li>
                             <li className="nav visible-sm visible-xs"><a href="/favorites">Favorites</a></li>
                             <li className="nav visible-sm visible-xs"><a href="/scores">Scores</a></li>
                </ul>
              <Nav pullRight>
                  <NavDropdown eventKey={3} title="More" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Privacy Policy</MenuItem>
                    <MenuItem eventKey={3.2}>Cookie Policy</MenuItem>
                    <MenuItem eventKey={3.3}>Disclaimer</MenuItem>
                  </NavDropdown>
                  <ul className="nav navbar-nav navbar-right">
                    <li className="nav"><Link to="/about" >Terms</Link></li>
                    <li className="nav"><Link to="/about" >About</Link></li>
                    <li className="nav"><Link to="/about" >Help</Link></li>
                    <li className="nav"><a href="/logout" onClick={this.logOut}>log out {localStorage.username}</a></li>
                  </ul>
              </Nav>
            </Navbar.Collapse>
            </Navbar>
                );
            }
            else
            {
              return (
                  <Navbar inverse collapseOnSelect>
                  <Navbar.Header>
                    <Navbar.Brand>
                      <a href="#">React-Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                  </Navbar.Header>
                  <Navbar.Collapse>
                      <ul className="nav navbar-nav">
                                   <li className="nav active"><a href="/">Home</a></li>
                                   <li className="nav"><a href="/venues">Venues</a></li>
                                   <li className="nav"><a href="/teams">Teams</a></li>
                                   <li className="nav"><a href="/posts">Posts</a></li>
                      </ul>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title="More" id="basic-nav-dropdown">
                          <MenuItem eventKey={3.1}>Privacy Policy</MenuItem>
                          <MenuItem eventKey={3.2}>Cookie Policy</MenuItem>
                          <MenuItem eventKey={3.3}>Disclaimer</MenuItem>
                          {/* <MenuItem divider />
                          <MenuItem eventKey={3.3}>Separated link</MenuItem> */}
                        </NavDropdown>
                        <ul className="nav navbar-nav navbar-right">
                          <li className="nav"><Link to="/about" >Terms</Link></li>
                          <li className="nav"><Link to="/about" >About</Link></li>
                          <li className="nav"><Link to="/about" >Help</Link></li>
                          <li className="nav"><Link to="/login" >Login</Link></li>
                        </ul>
                    </Nav>
                  </Navbar.Collapse>
                  </Navbar>

                    );
                }
    }
}

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
