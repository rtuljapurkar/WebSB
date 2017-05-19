import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import VenueList from './VenueList';
import * as actions from '../../actions/venueActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import VenuesTable from './VenuesTable'

class VenuesPage extends React.Component {


  componentWillMount() {
    if (this.props.venues.data == [] || this.props.venues.data.length == 1) {
        this.props.actions.loadVenues()
        .then()
        .catch( error => {
            toastr.error(error);
        });
    }
  }


  render() {
    const venues = this.props.venues;
    return (
      <div className="col-md-12">
        <h1>Venues {this.props.loading && <LoadingDots interval={100} dots={20}/>}
        </h1>
        <div className="col-md-12">
          <VenuesTable {...this.props} />
        </div>
      </div>
    );
  }
}

VenuesPage.propTypes = {
  venues: PropTypes.object.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired

};


function mapStateToProps(state, ownProps) {
  if (state.venues.data && state.venues.data.length > 0) {
    return {
            venues: state.venues,
            loading: state.ajaxCallsInProgress > 0
    };
  }
  else  {
    return {
                venues: {
                  data: [{id: '', VName: '', VAddress: '', VCity: '', VImage: '' }],
                  sortDesc: false,
                  sortKey: 'VName',
                  filterString: ''
              },
                loading: state.ajaxCallsInProgress > 0
            };
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VenuesPage);
