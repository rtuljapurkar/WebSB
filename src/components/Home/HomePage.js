import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
        <div >
            <div className="jumbotron" >
                <h2 style={{"textAlign":"center"}}>
                   <span style={{"color":"white", "fontFamily":"Montserrat"}}>S</span>
                   <span style={{"color":"yellow"}}>B</span></h2>
            </div>
            <div>
                <Link to="login" className="btn btn-primary btn-md">Please Proceed</Link>
            </div>
        </div>

    );
  }
}

export default HomePage;
