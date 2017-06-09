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
        this.changeDate = this.changeDate.bind(this);
        //this.state = {dateSelected : ""};
    }

  componentWillMount() {
        //this.setState({dateSelected: this.props.scores.dateSelected});
        if (localStorage.username != undefined && (this.props.scores.data == [] || this.props.scores.data.length == 1)) {
            this.props.actions.loadScores()
            .then()
            .catch( error => {
                toastr.error(error);
            });

            this.props.actions.loadScoresAvailableDates()
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
        let selected = moment(this.props.scores.dateSelected);
        const {filterString} = this.props.scores;
        const str = filterString.toLowerCase();
        return localData.filter((r) => {
              let gameDate =  moment(r.GameDate).format("YYYY-MM-DD");
            return  (moment(selected).isSame(gameDate));
     });
    }

    sortData () {
      const data = [...this.props.scores.AvailableDates] ;
      const sortKey = "Dates";
      const sortDesc =  false;
      const multiplier = sortDesc ? -1 : 1;
      data.sort((a, b) => {
        const aVal = Date(a[sortKey]["Dates"])  || 0;
        const bVal = Date(b[sortKey]["Dates"])  || 0;
        return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
      });
      return data;
    }

findByAttribute(array, attr, value) {
    for(let i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

changeDate(event){
    let dateNow = moment(this.props.scores.dateSelected);
    let newDate = dateNow;

    let type = event.target.getAttribute("data-type");
    let availableDates = this.sortData();
    let totalDates = availableDates.length;

    let selectDateIndex = this.findByAttribute(availableDates, "Dates", this.props.scores.dateSelected); // availableDates.indexOf(this.props.scores.dateSelected);

    if(type=="minus"){
        if(selectDateIndex > 0)
        {
            newDate = availableDates[selectDateIndex - 1]["Dates"];
        }
    }
    if(type=="plus") {
        if(selectDateIndex < totalDates-1)
        {
            newDate = availableDates[selectDateIndex + 1]["Dates"];
        }
    }

    if (dateNow != newDate)
    {
        this.props.actions.changeSelectedDate(newDate)
    }
}

  render() {
    let dateSelected = this.props.scores.dateSelected;
    let scoresData = this.props.scores.data;
    scoresData = this.filterData(scoresData);

    return (
            <div className="col-md-12"  style={{"margin-bottom": "50px"}}  >
                <div className="blackBg" style={{"textAlign":"center", "width":"100%"}} >
                                <span className="glyphicon glyphicon-chevron-left text-warning"
                                     style={{"textAlign":"left"}} data-type="minus" onClick={this.changeDate}>
                                </span>
                                <span> </span>
                                {dateSelected}
                                <span> </span>
                                <span className="glyphicon glyphicon-chevron-right text-warning"
                                     style={{"textAlign":"right"}} data-type="plus" disabled="true" onClick={this.changeDate}>
                                </span>
                </div>
                <div style={{"height":"200px", "width":"100%","overflow": "auto"}}>
                    {scoresData.map((score, index) => {
                                  return(
                                        <ScoresTable key={score.ID} score= {score} />
                                      );
                            })}
                </div>
          </div>

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


/*
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
*/
