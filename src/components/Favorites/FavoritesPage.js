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
    const favorites = this.props.favorites;
    return (
          <FavoritesTable {...this.props} />    
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
            loading: state.ajaxCallsInProgress > 0,
            venues: state.venues
    };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);