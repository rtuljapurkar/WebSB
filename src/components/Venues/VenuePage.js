import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import VenueList from './VenueList';
import * as actions from '../../actions/venueActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';


class VenuesPage extends React.Component {


  componentWillMount() {
      console.log("componentWillMount" );
    //   console.log(this.props.venues);
     // console.log(this.props.venues.length);
    if (this.props.venues == 'undefined' || this.props.venues.length == 1) {
        console.log("VenuesPage calling loadVenues");
        this.props.actions.loadVenues()
        .then()
        .catch( error => {
                    toastr.error(error);
        });
        //console.log(this.props);
    }
  }


  render() {
    const venues = this.props.venues;
    console.log("VenuesPage render" );
    //console.log(this.props);
    //console.log("here" + venues.length);
    //debugger;
    return (
      <div className="col-md-12">
        <h1>Venues {this.props.loading && <LoadingDots interval={100} dots={20}/>}
        </h1>
        <div className="col-md-12">
          <VenueList venues={venues} />
        </div>
      </div>
    );
  }
}

VenuesPage.propTypes = {
  venues: PropTypes.array.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired

};


function mapStateToProps(state, ownProps) {
    console.log("mapStateToProps VenuesPage");
    console.log("mapStateToProps: ajaxCallsInProgress = " + state.ajaxCallsInProgress);
  if (state.venues && state.venues.length > 0) {
    return {
            venues: state.venues,
            loading: state.ajaxCallsInProgress > 0
    };
  }
  else  {
    return {
                venues: [{id: '', VName: '', VAddress: '', VCity: '', VImage: '' }],
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
