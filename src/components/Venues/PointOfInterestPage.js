import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/pointOfInterestActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import PointOfInterestTable from './PointOfInterestTable';
import {DisplayMap} from '../common/DisplayMap';

 function renderSortArrow (sortKey, sortDesc, sortId) {
  return sortKey === sortId ? (sortDesc ? '↓' : '↑') : '';
}

// function SortHeaderCell ({children, sortBy, sortKey, sortDesc, columnKey}) {
//     const clickFunc = () => sortBy(columnKey);
//     return (
//         <Cell >
//           <a onClick={clickFunc}>
//             {children} {renderSortArrow(sortKey, sortDesc, columnKey)}
//           </a>
//         </Cell>
//     );
// }

// SortHeaderCell.propTypes = {
//   sortBy: PropTypes.func.isRequired,
//   sortKey: PropTypes.string.isRequired,
//   sortDesc: PropTypes.bool.isRequired,
//   columnKey: PropTypes.string,
//   children: PropTypes.element.isRequired
// };

class PointOfInterestPage extends React.Component {
  componentWillMount() {
    if (this.props.pointOfInterests.data == [] || this.props.pointOfInterests.data.length == 1) {
        this.props.actions.loadPointOfInterests(this.props.params.venueId)
        .then()
        .catch( error => {
            toastr.error(error);
        });
    }

    if (this.props.pointOfInterests.venue.id == 0 ) {
              this.props.actions.getVenueByID(this.props.params.venueId)
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
       const {filterString} = this.props.pointOfInterests;
       const str = filterString.toLowerCase();
       return str !== ''
         ? localData.filter((r) => Object.values(r).some(this.doesMatch(str)))
         : localData;
     }



     sortData () {
       const data = [...this.props.pointOfInterests.data] ;
       const {sortKey, sortDesc} = this.props.pointOfInterests;
       const multiplier = sortDesc ? -1 : 1;
       data.sort((a, b) => {
         const aVal = a[sortKey] || 0;
         const bVal = b[sortKey] || 0;
         return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
       });
       return data;
     }

  render() {
    //const pointOfInterests = this.props.pointOfInterests;
    const { filterString, sortKey, sortDesc } = this.props.pointOfInterests;
    const {sortBy} = this.props.actions;
    const headerCellProps = { sortBy, sortKey, sortDesc };
    let localData = this.sortData();
    localData = this.filterData(localData);
    let venue = this.props.pointOfInterests.venue;
    let locArray = venue.VGPSLoc.split(',');
    let gpsLocationObj = {};
    try{
        gpsLocationObj.lat = Number(locArray[0]);
        gpsLocationObj.lng = Number(locArray[1]);
    }
    catch(ex){
        gpsLocationObj.lat = -34.397;
        gpsLocationObj.lng = 150.644;
    }
    return (
          <div className="col-md-12" >
              <h1>Points Of Interest {this.props.loading && <LoadingDots interval={100} dots={20}/>} </h1>

              <div className="blackBg visible-md visible-lg visible-xl" style={{"min-height":"210", "overflow":"auto"}}>
                   <div className="ib"  style={{"min-width":"15%", "max-width":"45%"}}>
                        <div  className="ib"   >
                            {venue.VName} <br/>
                            {venue.VCity}
                         </div>
                         <div  className="ib"    >
                             {venue.VDescription}
                         </div>
                    </div>
                     <div className="ibInline" >
                        <img src={venue.VImage} height="200" alt="" width="200" />
                     </div>
                     <div className="ibInline" style={{"float":"right"}}>
                          <DisplayMap
                              location={gpsLocationObj}
                              containerElement={
                                       <div style={{ height: '200px', width:"200px"}} />
                                    }
                                    mapElement={
                                       <div style={{ height: '100%', width:"200px"}} />
                                    }
                            />
                     </div>
                 </div>
                  <br/><br />
                  <input className="filter-input" value={filterString}
                     onChange={this.handleFilterStringChange()}
                     type="text" placeholder="Filter Rows"
                     autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                   <br /><br />
                   {
                       localData.length > 0 &&
                      <table className="table table-striped table-bordered table-responsive table-hover mainScreen" >
                            <tbody>{
                                        localData.map((PointOfInterest, index) => {
                                          return(
                                                  <PointOfInterestTable  key={index}
                                                      PointOfInterest={PointOfInterest} venue={venue}  />
                                            );})
                                    }
                            </tbody>
                      </table>
                  }
                  {
                      localData.length == 0 &&
                      <h3>No points of interest found</h3>
                  }
      </div>
    );
  }
}

PointOfInterestPage.propTypes = {
  pointOfInterests: PropTypes.object.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  params:  PropTypes.object.isRequired,
  venue: PropTypes.object
};


function mapStateToProps(state, ownProps) {
  return {
            pointOfInterests: state.pointOfInterests,
            loading: state.ajaxCallsInProgress > 0
    };

}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PointOfInterestPage);
/*

<table className="table table-striped table-responsive table-hover mainScreen">
    <tbody style={{"height":"200px"}}>
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
</table>*/
