import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
        <div className="jumbotron" >
            <h1>SB</h1>
            <Link to="login" className="btn btn-primary btn-lg">Please Proceed</Link>
        </div>

    );
  }
}

export default HomePage;
