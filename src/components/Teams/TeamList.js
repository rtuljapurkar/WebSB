import React, {PropTypes} from 'react';
import TeamListItem from './TeamListItem';
import { Table, Pagination } from 'react-bootstrap';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/teamActions';
import toastr from 'toastr';
import LoadingDots from '../common/LoadingDots';
import {bindActionCreators} from 'redux';
import {Link, browserHistory} from 'react-router';

class TeamList extends React.Component {
    constructor(props){
        super(props);
        this.changePage = this.changePage.bind(this);
    }

    componentWillMount() {

      if (this.props.teams == 'undefined' || this.props.teams.length == 1) {
          this.props.dispatch(actions.loadTeams())
          .then()
          .catch( error => {
                      toastr.error(error);
          });
      }
    }

    changePage(page)
    {
        //this.props.dispatch(push('/teams?page=' +page));
        browserHistory.push('/teams?page=' +page);
    }

    render(){
        const per_page = 6;        
        const pages = Math.ceil(this.props.teams.length / per_page);
        const current_page =  this.props.page;
        const start_offset = (current_page - 1) * per_page;
        let start_count = 0;

        return (
            <div>
                <h1>Teams {this.props.loading && <LoadingDots interval={100} dots={20}/>}</h1>

                <Table bordered hover striped responsive mainScreen>
                  <thead>
                      <tr>
                          <th>Team Name</th>
                          <th>League</th>
                          <th>Description</th>
                          <th>Tags</th>
                          <th>Logo</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.props.teams.map((team, index) => {
                                if(index >= start_offset && start_count < per_page) {
                                    start_count++;
                                    return(
                                          <TeamListItem key={team.id} team = {team} />
                                        );
                                  }
                              })}
                  </tbody>
              </Table>

              <Pagination className="teams-pagination pull-right" bsSize="medium" maxButtons={10}
                      first last next prev boundryLinks items={pages} activePage={current_page}
                          onSelect={this.changePage} />
          </div>
        );
    }
}


TeamList.propTypes = {
  teams: PropTypes.array.isRequired,
  dispatch: PropTypes.function,
  actions: PropTypes.object.isRequired,
  page: PropTypes.number,
  loading: PropTypes.bool.isRequired

};


function mapStateToProps(state, ownProps) {
      if (state.teams && state.teams.length > 0) {
            return ({
                    teams: state.teams,
                    routing: state.routing,
                    page: state.routing.locationBeforeTransitions ?
                        Number(state.routing.locationBeforeTransitions.query.page) || 1 : 1,
                    loading: state.ajaxCallsInProgress > 0
                });
            }
      else  {
                return ({
                            teams: [{Active:'', Description: '', League: '', Logo: '', Name: '',
                            Tags: '',  VenueID: '', id: ''  }],
                            page: 1,
                            loading: state.ajaxCallsInProgress > 0
                        });
      }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps) (TeamList);
