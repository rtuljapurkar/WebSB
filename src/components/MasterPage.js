import React from 'react';
import { Link } from 'react-router';
import FavoritesPage from './Favorites/FavoritesPage';
import ScoresPage from './Scores/ScoresPage';
import Header from './common/Header';

class MasterPage extends React.Component {
  render() {
       let title = "";
      try {
          title = this.props.children.props.routes[2].title;
      }
      catch (ex){
         title = "";
      }
    return (
      // <div className='MasterPage'>
      //   <Header />
      //   { this.props.children }
      // </div>
 <div >
        <div className="col-md-12">
          <Header/>
          {/* {//console.log(this.props)} */}
          <title>{title}</title>
        </div>
        <div id="body" className="col-md-12" >
            <div  className="col-md-3  visible-md visible-lg " >
                  <ScoresPage/>
                  <div style={{"clear":"both"}}></div>
                  <div >
                      <img style={{"display":"block", "margin":" 20px auto"}}  src= {require('../images/AdSample.png')}
                      className="img-thumbnail" alt="Ad" width="80%"/>
                  </div>
                  <div style={{"clear":"both"}}></div>
            </div>

            <div className="col-md-7" >
                {this.props.children}
            </div>

            <div id="sidebar" className="col-md-2 visible-md visible-lg" style={{"paddingRight": "2px"}}>
                <FavoritesPage/>
                <div style={{"clear":"both"}}></div>
                 <div >
                      <img src= {require('../images/AdSample.png')}
                      className="img-thumbnail" width="100%" alt="Ad"/>
                </div>
             </div>
        </div>
   </div>
    );
  }
}

MasterPage.propTypes = {
    children: React.PropTypes.object.isRequired
};

export default MasterPage;
