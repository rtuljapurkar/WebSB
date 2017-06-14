import React  from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/scoresActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import ScoresTable from './ScoresTable';
import {Button, Glyphicon} from 'react-bootstrap';
import moment from 'moment';
import {PropTypes} from 'prop-types';

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
            this.props.actions.loadScoresAvailableDates()
            .then()
            .catch( error => {
                toastr.error(error);
            });

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
        let selected = moment(this.props.scores.dateSelected, "YYYY-MM-DD").format("YYYY-MM-DD");
        const {filterString} = this.props.scores;
        const str = filterString.toLowerCase();
        return localData.filter((r) => {
            let gameDate =  moment(r.GameDate, "MM/DD/YYYY").format("YYYY-MM-DD");
            return  (selected == gameDate);
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
    let dateNow = moment(this.props.scores.dateSelected).format("MM/DD/YYYY");
    let newDate = dateNow;

    let type = event.target.getAttribute("data-type");
    let availableDates = this.sortData();
    let totalDates = availableDates.length;

    let selectDateIndex = this.findByAttribute(availableDates, "Dates", dateNow); // availableDates.indexOf(this.props.scores.dateSelected);
console.log(selectDateIndex);
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
        this.props.actions.changeSelectedDate(newDate);
    }
}

  render() {
    let dateSelected = this.props.scores.dateSelected;
    let scoresData = this.props.scores.data;
    scoresData = this.filterData(scoresData);
    //console.log(dateSelected);
    return (
            <div className="col-md-12"  style={{"marginBottom": "50px","paddingLeft": "4px","paddingRight": "4px"}}  >
                {this.props.loading &&
                        <div className="blackBg" style={{"textAlign":"left", "width":"100%"}} >
                                 <h4><LoadingDots interval={100} dots={5}/></h4>
                        </div>}
                {!this.props.loading && //scoresData.length > 1 &&
                <div className="blackBg" style={{"textAlign":"center", "width":"100%"}} >
                                <span className="glyphicon glyphicon-chevron-left text-warning"
                                     style={{"textAlign":"left"}} data-type="minus" onClick={this.changeDate}>
                                </span>
                                <span>&nbsp;&nbsp;&nbsp; </span>
                                {dateSelected}
                                <span>&nbsp;&nbsp;&nbsp; </span>
                                <span className="glyphicon glyphicon-chevron-right text-warning"
                                     style={{"textAlign":"right"}} data-type="plus"
                                     disabled="true" onClick={this.changeDate}>
                                </span>
                </div>}
                {!this.props.loading && //scoresData.length > 1 &&
                    <div style={{"height":"200px", "width":"100%","overflow": "auto"}}>
                        {scoresData.map((score, index) => {
                                      return(
                                            <ScoresTable key={score.ID} score= {score} />
                                          );
                                })}
                </div>}
                {!this.props.loading && scoresData.length <=1 &&
                    <div style={{"height":"20px"}}>
                        <div className="blackBg">
                            Scores Not found
                        </div>
                </div>}

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
            loading: state.loadingStatus.loadingScores > 0,
            venues: state.venues
    };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoresPage);
