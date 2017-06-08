import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
        <div >
            <div className="jumbotron" >
                <h2 style={{"text-align":"center"}}>
                   <span style={{"color":"white", "fontFamily":"Montserrat"}}>Stadium</span>
                   <span style={{"color":"yellow"}}>Bee</span></h2>
            </div>
            <div>
                <Link to="login" className="btn btn-primary btn-md">Please Proceed</Link>
            </div>
        </div>

    );
  }
}

export default HomePage;
