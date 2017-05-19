import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TeamList from './TeamList';
import * as actions from '../../actions/teamActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';


class TeamsPage extends React.Component {


  componentWillMount() {
    if (this.props.teams == 'undefined' || this.props.teams.length == 1) {
        this.props.actions.loadTeams()
        .then()
        .catch( error => {
                    toastr.error(error);
        });
    }
  }


  render() {
    const teams = this.props.teams;
    return (
      <div className="col-md-12">
        <h1>Teams {this.props.loading && <LoadingDots interval={100} dots={20}/>}
        </h1>
        <div className="col-md-12">
          <TeamList teams={teams} />
        </div>
      </div>
    );
  }
}

TeamsPage.propTypes = {
  teams: PropTypes.array.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired

};


function mapStateToProps(state, ownProps) {
  if (state.teams && state.teams.length > 0) {
    return {
            teams: state.teams,
            loading: state.ajaxCallsInProgress > 0
    };
  }
  else  {
    return {
                teams: [{Active:'', Description: '', League: '', Logo: '', Name: '',
                Tags: '',  VenueID: '', id: ''  }],
                loading: state.ajaxCallsInProgress > 0
            };
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
