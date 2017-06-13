import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/favoritesActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import FavoritesTable from './FavoritesTable';

class FavoritesPage extends React.Component {
  componentWillMount() {

    if (this.props.favorites.data == [] || this.props.favorites.data.length == 1) {
        this.props.actions.loadFavorites()
        .then()
        .catch( error => {
            toastr.error(error);
        });
    }

    if (this.props.venues.data == [] || this.props.venues.data.length == 0) {
        this.props.actions.loadVenues()
        .then()
        .catch( error => {
            toastr.error(error);
        });
    }
  }


  render() {
    const favorites = this.props.favorites.data;
    return (

            <div className="col-md-12"  style={{"marginBottom": "50px","paddingRight": "4px" }}  >
             {this.props.loading &&
                        <div className="blackBg" style={{"textAlign":"left", "width":"100%"}} >
                                 <h4><LoadingDots interval={100} dots={5}/></h4>
                        </div>}
                        {!this.props.loading &&
                        <div className="blackBg" style={{"textAlign":"center", "width":"100%"}} >
                                 Favorites
                        </div>}
              {!this.props.loading &&
                  <div style={{"height":"200px", "width":"100%","overflow": "auto"}}>
                   {favorites.map((favorite, index) => {
                       if(favorite.VenueID > 0){
                             return(
                                       <FavoritesTable key={favorite.id} favorite={favorite} venueID={favorite.VenueID} venues={this.props.venues}/>
                                     );
                             }
                           })}
               </div>}
            </div>
            //   <table className="table table-fixed table-striped table-bordered
            //                   table-responsive table-hover scroll" style={{"paddingRight": "2px"}}>
            //   {this.props.loading &&
            //           <div className="blackBg" style={{"textAlign":"left", "width":"100%"}} >
            //                    <h4><LoadingDots interval={100} dots={5}/></h4>
            //           </div>}
            //     {!this.props.loading &&   <thead>
            //           <tr>
            //               <th>
            //                 Favorites
            //               </th>
            //            </tr>
            //       </thead>}
            //      {!this.props.loading &&  <tbody>
            //           {favorites.map((favorite, index) => {
            //               if(favorite.VenueID > 0){
            //                     return(
            //                               <FavoritesTable key={favorite.id} favorite={favorite} venueID={favorite.VenueID} venues={this.props.venues}/>
            //                             );
            //                     }
            //                   })}
            //       </tbody>}
            //   </table>
    );
  }
}

FavoritesPage.propTypes = {
  favorites: PropTypes.object.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  venues: PropTypes.object


};


function mapStateToProps(state, ownProps) {
     return {
            favorites: state.favorites,
            loading: state.loadingStatus.loadingFavorites > 0,
            venues: state.venues
    };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
/*

<table className="table table-fixed table-striped table-bordered
                table-responsive table-hover scroll" style={{"paddingRight": "2px"}}>
{this.props.loading &&
        <div className="blackBg" style={{"textAlign":"left", "width":"100%"}} >
                 <h4><LoadingDots interval={100} dots={5}/></h4>
        </div>}
  {!this.props.loading &&   <thead>
        <tr>
            <th>
              Favorites
            </th>
         </tr>
    </thead>}
   {!this.props.loading &&  <tbody>
        {favorites.map((favorite, index) => {
            if(favorite.VenueID > 0){
                  return(
                            <FavoritesTable key={favorite.id} favorite={favorite} venueID={favorite.VenueID} venues={this.props.venues}/>
                          );
                  }
                })}
    </tbody>}
</table>
*/
