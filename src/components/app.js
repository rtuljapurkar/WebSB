// This component handles the App template used on every page.
import React  from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

class App extends React.Component {
  render() {
    return (
      <div className="container" >
          <Header/>
          {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};


export default (App);
