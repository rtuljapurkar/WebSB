import React  from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/amenityActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import AmenitiesTable from './AmenitiesTable';
import {DisplayMap} from '../common/DisplayMap';
import {PropTypes} from 'prop-types';

class AmenitiesPage extends React.Component {
  constructor(props){
      super(props);
      this.handleFilterDropdownChange = this.handleFilterDropdownChange.bind(this);
  }
  componentWillMount() {
    if (this.props.params.venueId > 0 && this.props.params.venueId != this.props.amenities.venue.id ) {
            this.LoadProps(this.props.params.venueId);
      }
    }
    componentWillReceiveProps (nextProps) {
       if(nextProps.params.venueId !== this.props.params.venueId) {
           this.LoadProps(nextProps.params.venueId);
       }
    }

    LoadProps(venueId){        
        this.props.actions.getVenueByID(venueId)
        .then()
        .catch( error => {
                  toastr.error(error);
        });

        this.props.actions.loadAmenities(venueId)
        .then()
        .catch( error => {
            toastr.error(error);
        });
    }

    handleFilterDropdownChange () {
       return (e) => {
         e.preventDefault();
         this.props.actions.filterByType(e.target.value);
       };
     }

    doesMatch (str) {
      return (key) => (key + '').toLowerCase().indexOf(str) !== -1;
    }

    filterByType (localData) {
      const {filterType} = this.props.amenities;
      const str = filterType.toLowerCase();
      return str !== ''
          ? localData.filter((r) => r.AType.toLowerCase() === str)
          : localData;
    }

    sortData () {
      const data = [...this.props.amenities.data] ;
      const {sortKey, sortDesc} = this.props.amenities;
      const multiplier = sortDesc ? -1 : 1;
      data.sort((a, b) => {
        const aVal = a[sortKey] || 0;
        const bVal = b[sortKey] || 0;
        return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
      });
      return data;
    }

  render() {
    const amenities = this.props.amenities;
    let venue = this.props.amenities.venue;
    let localData = this.filterByType(this.props.amenities.data);
    let locArray = [];
    let gpsLocationObj = {};
    try{
        locArray = venue.VGPSLoc.split(',');
        gpsLocationObj.lat = Number(locArray[0]);
        gpsLocationObj.lng = Number(locArray[1]);
    }
    catch(ex){
        gpsLocationObj.lat = -34.397;
        gpsLocationObj.lng = 150.644;
    }
    return (
          <div className="col-md-12">
              <h1>Amenities at {this.props.amenities.venue.VName}</h1> {this.props.loading && <h4><b><LoadingDots interval={100} dots={20}/></b></h4>}

                {!this.props.loading &&   <table className="table table-striped table-responsive table-hover mainScreen visible-md visible-lg">
                          <tbody style={{"height":"250px", "overflow":"none"}}>
                            <tr >
                              <td className="blackBg">
                                {venue.VName} <br/>
                                {venue.VCity}
                              </td>
                              <td rowSpan="2"  >
                                  <DisplayMap
                                      location={gpsLocationObj}
                                      containerElement={
                                               <div style={{ height: '200px', width:"200px"}} />
                                            }
                                            mapElement={
                                               <div style={{ height: '100%', width:"200px"}} />
                                            }

                                    />
                              </td>
                              <td rowSpan="2" >
                                <img src={venue.VImage} height="200" alt="" width="200" />
                              </td>
                            </tr>
                            <tr>
                              <td className="blackBg">
                                {venue.VDescription}
                              </td>
                            </tr>
                          </tbody>
                      </table>}
                      <br/>
                    {!this.props.loading &&     <select className="btn btn-primary"
                            onChange={this.handleFilterDropdownChange()}>
                          <option value="">All Categories</option>
                          <option value="Miscellaneous">Miscellaneous</option>
                          <option value="Food and Beverage">Food & Beverage</option>
                          <option value="Information">Information</option>
                          <option value="Merchandise">Merchandise</option>
                          <option value="Parking">Parking</option>
                          <option value="Restrooms">Restrooms</option>
                      </select>}
                       <br /><br />
                       {!this.props.loading &&
                           localData.length > 0 &&
                            <div style={{"maxHeight":"650px", "overflow": "auto"}}>
                                 {localData.map((Amenity, index) => {
                                              return(
                                                    <AmenitiesTable key={Amenity.id} Amenity={Amenity}  />
                                );})}
                            </div>
                      }
                      {!this.props.loading &&
                          localData.length == 0 &&
                          <h3>No amenities found</h3>
                      }
            </div>
    );
  }
}

AmenitiesPage.propTypes = {
  amenities: PropTypes.object.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  params:  PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
            amenities: state.amenities,
            loading: state.loadingStatus.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AmenitiesPage);
