// import React, {PropTypes} from 'react';
// import {Link, browserHistory} from 'react-router';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as actions from '../../actions/pointOfInterestActions';
// import LoadingDots from '../common/LoadingDots';
// import toastr from 'toastr';
// import PointOfInterestTable from './PointOfInterestTable';
//
//
// class PointOfInterestPage extends React.Component {
//   componentWillMount() {
//     if (this.props.pointOfInterests.data == [] || this.props.pointOfInterests.data.length == 1) {
//         this.props.actions.loadPointOfInterests(this.props.params.venueId)
//         .then()
//         .catch( error => {
//             toastr.error(error);
//         });
//     }
//
//     if (this.props.pointOfInterests.venue.id == 0 ) {
//               this.props.actions.getVenueByID(this.props.params.venueId)
//               .then()
//               .catch( error => {
//                           toastr.error(error);
//               });
//       }
//     }
//
//
//   render() {
//     const pointOfInterests = this.props.pointOfInterests;
//     return (
//       <div className="col-md-12">
//
//
//         <h1>Point Of Interests {this.props.loading && <LoadingDots interval={100} dots={20}/>}
//         </h1>
//         <div className="col-md-12">
//           <PointOfInterestTable {...this.props} />
//         </div>
//       </div>
//     );
//   }
// }
//
// PointOfInterestPage.propTypes = {
//   pointOfInterests: PropTypes.object.isRequired,
//   children: PropTypes.object,
//   actions: PropTypes.object.isRequired,
//   loading: PropTypes.bool.isRequired,
//   params:  PropTypes.object.isRequired
// };
//
//
// function mapStateToProps(state, ownProps) {
//   return {
//             pointOfInterests: state.pointOfInterests,
//             loading: state.ajaxCallsInProgress > 0
//     };
//
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//       actions: bindActionCreators(actions, dispatch)
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(PointOfInterestPage);
