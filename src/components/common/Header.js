import React, {PropTypes} from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../actions/sessionActions';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
let $ = require('jquery');

class  Header extends React.Component {
    constructor(props) {
        super();
        this.logOut = this.logOut.bind(this);
        this.state = {
        scriptString: "$('.nav').find('.current').removeClass('current');$(this).addClass('current');"
    };
    }

    componentDidMount() {
        const script = document.createElement("script");
        let embedCode = this.state.scriptString; // <script>//my js script code</script>
        let testScript = "$('.nav a').on('click', function(){" + embedCode + "})";
        script.innerHTML = testScript;
        //script.innerHTML = "alert('asdasdasd')";
        //debugger;
        $("#activeTracker").append( script );
    }

    logOut(event) {
        event.preventDefault();
        this.props.actions.logOutUser();
        browserHistory.push("/");
    }

render(){
        if (this.props.logged_in === true) {
        return (
        <div>
                <div id="activeTracker">
                </div>
                    <div id="main_navbar">
                        <Navbar inverse collapseOnSelect>
                        <Navbar.Header>
                          <Navbar.Brand>
                                  <a href="http://www.stadiumbee.com">React</a>
                            {/* <a href="http://www.stadiumbee.com"><span style={{"color":"white", "fontFamily":"Montserrat"}}>Stadium</span><span style={{"color":"yellow"}}>Bee</span></a> */}
                          </Navbar.Brand>
                          <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>

                            <ul className="nav navbar-nav" id="ulid">
                                         <li><Link id="homenav" to="home" className="nav navbar-nav current">Home</Link></li>
                                         <li><Link id="venuesnav" to="venues" className="nav navbar-nav">Venues</Link></li>

                                         <li><Link id="teamsnav" to="teams" className="nav navbar-nav">Teams</Link></li>
                                         <li><Link id="postsnav" to="posts" className="nav navbar-nav">Post</Link></li>
                                         <li className="visible-sm visible-xs"><Link id="favoritesnav" to="favorites" className="nav navbar-nav">Favorites</Link></li>
                                         <li className="visible-sm visible-xs"><Link id="scoresnav" to="scores" className="nav navbar-nav">Scores</Link></li>
                            </ul>
                            
                          <Nav pullRight>
                              <ul className="nav navbar-nav navbar-right">
                                <li><Link id="termsnav" to="/about" className="nav navbar-nav" >Terms</Link></li>
                                <li><Link id="aboutnav" to="/about" className="nav navbar-nav">About</Link></li>
                                <li><Link id="helpnav" to="/about" className="nav navbar-nav">Help</Link></li>
                                <li><a href="/logout" onClick={this.logOut}>log out {localStorage.username}</a></li>
                              </ul>
                          </Nav>
                        </Navbar.Collapse>
                        </Navbar>
                    </div>
        </div>
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

// <NavDropdown eventKey={3} title="More" id="morenav" className="nav navbar-nav">
//   <MenuItem eventKey={3.1} id="privacynav" className="nav navbar-nav">Privacy Policy</MenuItem>
//   <MenuItem eventKey={3.2} id="cookienav"  className="nav navbar-nav">Cookie Policy</MenuItem>
//   <MenuItem eventKey={3.3} id="disclaimernav"  className="nav navbar-nav">Disclaimer</MenuItem>
// </NavDropdown>
// <li className="dropdown">
// <Link id="anav" to="c" className="nav navbar-nav dropdown-toggle" data-toggle="dropdown">ALink
// 		<b className="caret"></b></Link>
// 		<ul className="dropdown-menu">
// 			<li>
//         <Link id="anav" to="a" className="nav navbar-nav">ALink</Link>
// 			</li>
// 			<li>
// 			    <Link id="bnav" to="b" className="nav navbar-nav">BLink</Link>
// 			</li>
// 		</ul>
// 	</li>
