import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import VenueList from './VenueList';
import * as actions from '../../actions/venueActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import VenuesTable from './VenuesTable';

class VenuesPage extends React.Component {
constructor(props){
    super(props);
}

  componentWillMount() {
    if (this.props.venues.data == [] || this.props.venues.data.length == 1) {
        this.props.actions.loadVenues()
        .then()
        .catch( error => {
            toastr.error(error);
        });
    }
  }

  handleFilterStringChange () {
     return (e) => {
       e.preventDefault();
       this.props.actions.filterBy(e.target.value);
     };
   }

   doesMatch (str) {
     return (key) => (key + '').toLowerCase().indexOf(str) !== -1;
   }

   filterData (localData) {
     const {filterString} = this.props.venues;
     const str = filterString.toLowerCase();
     return str !== ''
       ? localData.filter((r) => Object.values(r).some(this.doesMatch(str)))
       : localData;
   }

   sortData () {
     const data = [...this.props.venues.data] ;
     const {sortKey, sortDesc} = this.props.venues;
     const multiplier = sortDesc ? -1 : 1;
     data.sort((a, b) => {
       const aVal = a[sortKey] || 0;
       const bVal = b[sortKey] || 0;
       return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
     });
     return data;
   }


  render() {
        const { filterString, sortKey, sortDesc } = this.props.venues;
        const venues = this.props.venues.data;
        let localData = this.sortData();
        localData = this.filterData(localData);

        return (
          <div className="col-md-12">
            <h1>Venues {this.props.loading && <LoadingDots interval={100} dots={20}/>}
            </h1>
            <input className="filter-input" value={filterString}
              onChange={this.handleFilterStringChange()}
              type="text" placeholder="Filter Rows"
              autoCorrect="off" autoCapitalize="off" spellCheck="false" />
            <br /><br />
            <table className="table  table-striped table-bordered table-responsive table-hover mainScreen" >
                  <tbody>
                      <tr>
                          <th colSpan="2"><b>Venues</b></th>
                      </tr>
                      {
                              localData.map((venue, index) => {
                                    return(
                                            <VenuesTable  key={venue.id} venue={venue} venues={venues} />
                                      );})
                      }
                  </tbody>
           </table>

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
