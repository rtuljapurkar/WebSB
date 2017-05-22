import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/amenityActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import AmenitiesTable from './AmenitiesTable';

class AmenitiesPage extends React.Component {
  componentWillMount() {
    if (this.props.amenities.data == [] || this.props.amenities.data.length == 1) {
        this.props.actions.loadAmenities(this.props.params.venueId)
        .then()
        .catch( error => {
            toastr.error(error);
        });
    }

    if (this.props.amenities.venue.id == 0) {
              this.props.actions.getVenueByID(this.props.params.venueId)
              .then()
              .catch( error => {
                          toastr.error(error);
              });
      }
    }


  render() {
    const amenities = this.props.amenities;
    return (
      <div className="col-md-12">
        <h1>Amenities at {this.props.amenities.venue.VName} {this.props.loading && <LoadingDots interval={100} dots={20}/>}
        </h1>
        <div className="col-md-12">
          <AmenitiesTable {...this.props} />
        </div>
      </div>
    );
  }
}

AmenitiesPage.propTypes = {
  amenities: PropTypes.object.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  params:  PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
            amenities: state.amenities,
            loading: state.ajaxCallsInProgress > 0
    };

}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AmenitiesPage);
