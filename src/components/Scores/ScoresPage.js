import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/favoritesActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import ScoresTable from './ScoresTable';

class ScoresPage extends React.Component {
  componentWillMount() {
    // if (this.props.scores.data == [] || this.props.scores.data.length == 1) {
    //     this.props.actions.loadScores()
    //     .then()
    //     .catch( error => {
    //         toastr.error(error);
    //     });
    // }
    //
    // if (this.props.venues.data == [] || this.props.venues.data.length == 0) {
    //     this.props.actions.loadVenues()
    //     .then()
    //     .catch( error => {
    //         toastr.error(error);
    //     });
    // }
  }


  render() {
    const scores = this.props.scores;
    return (
          <ScoresTable {...this.props} />
    );
  }
}

ScoresPage.propTypes = {
  scores: PropTypes.object.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  venues: PropTypes.object

};


function mapStateToProps(state, ownProps) {
     return {
            scores: state.scores,
            loading: state.ajaxCallsInProgress > 0,
            venues: state.venues
    };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoresPage);
