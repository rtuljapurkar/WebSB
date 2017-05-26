import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/scoresActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import ScoresTable from './ScoresTable';
import {Button, Glyphicon} from 'react-bootstrap';

class ScoresPage extends React.Component {
    constructor(props){
        super(props);
        this.changeDate = this.changeDate.bind(this);
        this.state = {dateSelected : ""};
    }

  componentWillMount() {
       this.setState({dateSelected: this.props.scores.dateSelected});
        if (this.props.scores.data == [] || this.props.scores.data.length == 1) {
            this.props.actions.loadScores()
            .then()
            .catch( error => {
                toastr.error(error);
            });
        }
  }

    doesMatch (str) {
      return (key) => (key + '').toLowerCase().indexOf(str) !== -1;
    }


    filterData (localData) {
        const {filterString} = this.props.scores;
        const str = filterString.toLowerCase();
        const dateSelected = new Date(this.state.dateSelected);
        return localData.filter((r) => {
                let gameDate = new Date(r.GameDate);
            return  (dateSelected.getTime() === gameDate.getTime());
     });
    }

changeDate(event){
    let dateNow = new Date(this.state.dateSelected);
    let newDate = new Date();
    let dd = dateNow.getDate();
    let mm = dateNow.getMonth()+1; //January is 0!
    let yyyy = dateNow.getFullYear();


    if(mm<10) {
        mm='0'+mm;
    }

    let type = event.target.getAttribute("data-type");
    if(type=="minus"){
         dd = dateNow.getDate()-1;
    }
    else {
        dd = dateNow.getDate()+ 1;
    }
    if(dd<10) {
        dd='0'+dd;
    }

  this.setState({dateSelected: mm+'/'+dd+'/'+yyyy});
}

  render() {
    let dateSelected = this.state.dateSelected;
    let scoresData = this.props.scores.data;
    scoresData = this.filterData(scoresData);
    return (
            <table className="table table-striped table-bordered
                            table-responsive table-hover scroll" >
                <thead>
                    <tr>
                        <th>
                            <span className="glyphicon glyphicon-chevron-left text-success"
                                 style={{"textAlign":"left"}} data-type="minus" onClick={this.changeDate}>
                            </span>
                            <span> </span>
                            {dateSelected}
                            <span> </span>
                            <span className="glyphicon glyphicon-chevron-right text-success"
                                 style={{"textAlign":"right"}} data-type="plus" disabled="true" onClick={this.changeDate}>
                            </span>

                        </th>
                     </tr>
                </thead>
                <tbody>
                    {scoresData.map((score, index) => {
                                  return(
                                        <ScoresTable key={score.ID} score= {score} />
                                      );
                            })}
                </tbody>
            </table>


    );
  }
}

ScoresPage.propTypes = {
  scores: PropTypes.object.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  venues: PropTypes.object,
  dateSelected: PropTypes.string

};


function mapStateToProps(state, ownProps) {
     return {
            scores: state.scores,
            dateSelected: state.scores.dateSelected,
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
