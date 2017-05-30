import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/scoresActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import ScoresTable from './ScoresTable';
import {Button, Glyphicon} from 'react-bootstrap';
import moment from 'moment';

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
        let selected = moment(this.state.dateSelected);
      //  console.log(selected);
        const {filterString} = this.props.scores;
        const str = filterString.toLowerCase();
      //  const dateSelected = new Date(this.state.dateSelected);
        return localData.filter((r) => {
              let gameDate =  moment(r.GameDate);
            //  console.log(moment.duration(selected.diff(gameDate1)).get("days"));
              //  let gameDate = new Date(r.GameDate);
            return  (moment.duration(selected.diff(gameDate)).get("days") === 0);
     });
    }

changeDate(event){
    let dateNow = moment(this.state.dateSelected);
    let newDate;

    let type = event.target.getAttribute("data-type");
    if(type=="minus"){
         newDate = dateNow.subtract(1, 'day').format("YYYY-MM-DD");
    }
    if(type=="plus") {
        newDate = dateNow.add(1, 'day').format("YYYY-MM-DD");
    }
    //console.log(dateNow);

    let currentDate = moment(moment().format("YYYY-MM-DD"));
    //console.log(currentDate);
    //console.log(moment.duration(currentDate.diff(dateNow)).get("days"));
  if (moment.duration(currentDate.diff(dateNow)).get("days") >=0)
  {
    this.setState({dateSelected: newDate});
  }


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
