import React  from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import VenueList from './VenueList';
import * as actions from '../../actions/venueActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import VenuesTable from './VenuesTable';
import {PropTypes} from 'prop-types';

class VenuesPage extends React.Component {
constructor(props){
    super(props);
}

  componentWillMount() {
    if (this.props.venues.data == [] || this.props.venues.data.length == 1) {
        this.props.actions.loadVenuesMain()
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
        const venuesFound = (localData.length > 1 || (localData.length == 1 && localData[0].id > 0));
        return (
          <div className="col-md-12">
            <h1>Venues</h1> {this.props.loading && <h4><b><LoadingDots interval={100} dots={20}/></b></h4>}

            {!this.props.loading && venuesFound &&
                <input className="filter-input" value={filterString}
              onChange={this.handleFilterStringChange()}
              type="text" placeholder="Filter Rows"
              autoCorrect="off" autoCapitalize="off" spellCheck="false" />}
            <br /><br />
                <div style={{"maxHeight":"650px", "overflow": "auto"}}>
                      {!this.props.loading && venuesFound &&
                              localData.map((venue, index) => {
                                    return(
                                            <VenuesTable  key={venue.id} venue={venue} venues={venues} />
                                      );})
                      }
                      {!this.props.loading && !venuesFound &&
                          <h3>No Venues found</h3>
                      }
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
            loading: state.loadingStatus.ajaxCallsInProgress > 0
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
                loading: state.loadingStatus.ajaxCallsInProgress > 0
            };
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VenuesPage);
