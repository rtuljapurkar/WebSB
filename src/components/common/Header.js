import React  from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../actions/sessionActions';
// import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

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
        $("#activeTracker").append( script );
    }

    logOut(event) {
        event.preventDefault();
        this.props.actions.logOutUser();

        //window.location.href = "/login";
    }

render(){
        if (this.props.logged_in === true) {
        return (
        <div>
                <div id="activeTracker">
                </div>
                <div id="main_navbar">
                        <nav className="navbar navbar-inverse navbar-collapse">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" aria-expanded="true" aria-controls="navbar">
                                                   <span className="icon-bar"></span>
                                                   <span className="icon-bar"></span>
                                                   <span className="icon-bar"></span>
                                               </button>
                                               <a className="navbar-brand" href="http://www.stadiumbee.com">React</a>
                                                {/*<a class="navbar-brand" href="http://www.stadiumbee.com">
                                           <span style={{"color":"white", "fontFamily":"Montserrat"}}>Stadium</span><span style={{"color":"yellow"}}>Bee</span></a> */}
                                </div>
                                <div className="collapse navbar-collapse" id="myNavbar">
                                    <ul className="nav navbar-nav">
                                                 <li><Link id="homenav" to="/posts" className="nav navbar-nav current">Home</Link></li>
                                                 <li><Link id="venuesnav" to="/venues" className="nav navbar-nav">Venues</Link></li>

                                                 {/* <li><Link id="teamsnav" to="/teams" className="nav navbar-nav">Teams</Link></li> */}
                                                 <li><Link id="postsnav" to="/posts" className="nav navbar-nav">Posts</Link></li>
                                                 <li className="visible-sm visible-xs"><Link id="favoritesnav" to="/favorites" className="nav navbar-nav">Favorites</Link></li>
                                                 <li className="visible-sm visible-xs"><Link id="scoresnav" to="/scores" className="nav navbar-nav">Scores</Link></li>
                                    </ul><ul className="nav navbar-nav navbar-right">
                                        <li><Link id="termsnav" to="/terms" className="nav navbar-nav" >Terms</Link></li>
                                        <li><Link id="aboutnav" to="/about" className="nav navbar-nav">About</Link></li>
                                        <li><Link id="helpnav" to="/help" className="nav navbar-nav">Help</Link></li>
                                        <li><a href="/logout" onClick={this.logOut}>log out {localStorage.username}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                </div>
        </div>
                );
            }
            else
            {
              return (
                  <div>
                      <nav className="navbar navbar-inverse navbar-collapse">
                          <div className="container-fluid">
                              <div className="navbar-header">
                                              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" aria-expanded="true" aria-controls="navbar">
                                                 <span className="icon-bar"></span>
                                                 <span className="icon-bar"></span>
                                                 <span className="icon-bar"></span>
                                             </button>
                                             <a className="navbar-brand" href="http://www.stadiumbee.com">React</a>
                                              {/*<a class="navbar-brand" href="http://www.stadiumbee.com">
                                         <span style={{"color":"white", "fontFamily":"Montserrat"}}>Stadium</span><span style={{"color":"yellow"}}>Bee</span></a> */}
                              </div>
                              <div className="collapse navbar-collapse" id="myNavbar">
                                  <ul className="nav navbar-nav">
                                               <li><Link id="homenav" to="/posts" className="nav navbar-nav current">Home</Link></li>
                                               <li><Link id="venuesnav" to="/venues" className="nav navbar-nav">Venues</Link></li>

                                               {/* <li><Link id="teamsnav" to="/teams" className="nav navbar-nav">Teams</Link></li> */}
                                               <li><Link id="postsnav" to="/posts" className="nav navbar-nav">Posts</Link></li>
                                               <li className="visible-sm visible-xs"><Link id="favoritesnav" to="/favorites" className="nav navbar-nav">Favorites</Link></li>
                                               <li className="visible-sm visible-xs"><Link id="scoresnav" to="/scores" className="nav navbar-nav">Scores</Link></li>
                                  </ul><ul className="nav navbar-nav navbar-right">
                                      <li><Link id="termsnav" to="/terms" className="nav navbar-nav" >Terms</Link></li>
                                      <li><Link id="aboutnav" to="/about" className="nav navbar-nav">About</Link></li>
                                      <li><Link id="helpnav" to="/help" className="nav navbar-nav">Help</Link></li>
                                      <li><Link to="/login">Login</Link></li>
                                  </ul>
                              </div>
                          </div>
                      </nav>

                  </div>


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
