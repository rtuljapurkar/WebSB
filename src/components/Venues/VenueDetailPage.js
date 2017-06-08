import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/venueDetailActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import VenueDetailTable from './VenueDetailTable';
import {Button, Glyphicon} from 'react-bootstrap';

class VenueDetailPage extends React.Component {
constructor(props){
    super(props);
}

  componentWillMount() {
    if (this.props.params.venueId > 0) {
        this.props.actions.getVenueByID(this.props.params.venueId)
        .then()
        .catch( error => {
            toastr.error(error);
        });

        this.props.actions.getAllPostsByVenue(this.props.params.venueId)
        .then()
        .catch( error => {
            toastr.error(error);
        });

        this.props.actions.getAmenitiesByVenue(this.props.params.venueId)
        .then()
        .catch( error => {
            toastr.error(error);
        });

        this.props.actions.getPointOfInterestsByVenue(this.props.params.venueId)
        .then()
        .catch( error => {
            toastr.error(error);
        });

        this.props.actions.getAllUsers()
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

   sortData () {
     const data = [...this.props.venueDetail.venueRelatedPosts] ;
     const {sortKey, sortDesc} = this.props.venueDetail;
     const multiplier = sortDesc ? -1 : 1;
     data.sort((a, b) => {
       const aVal = a[sortKey] || 0;
       const bVal = b[sortKey] || 0;
       return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
     });
     return data;
   }

  render() {
        const venue = this.props.venueDetail.venue;
        const amenities = this.props.venueDetail.amenities;
        const pointOfInterests = this.props.venueDetail.pointOfInterests;
        const users = this.props.venueDetail.users;
        let localData = this.sortData();
        console.log(localData)  ;
        return (
          <div className="col-md-12">
            <h1>{venue.VName} {this.props.loading && <LoadingDots interval={100} dots={20}/>}
            </h1>
            <br /><br />
            <div className="blackBg">
                <div className="ib" >
                    <div className="ib" style={{"max-width":"100%"}}>
                          {venue["VName"]} <br/>
                          {venue["VCity"]}
                    </div>
                    <div className="ib" style={{"max-width":"100%"}}>
                        {venue["VDescription"]}
                    </div>
                    <div className="ib" style={{"max-width":"100%"}}>
                        <div className="ibInline">
                                <Link to={"/amenities/"+venue.id}>
                                    <Button bsStyle="primary" bsSize="small"  >
                                        <Glyphicon glyph="pencil" />  Amenities
                                    </Button>
                                </Link>
                         </div>
                         <div className="ibInline">
                                 <Link to={"/poi/"+venue.id}>
                                        <Button bsStyle="primary" bsSize="small"  >
                                            <Glyphicon glyph="pencil" />  Local 411
                                        </Button>
                                    </Link>
                         </div>
                         <div className="ibInline">
                             <a href={"/posts/add/"+venue.id}>
                                       <Button bsStyle="primary" bsSize="small" >
                                           <Glyphicon glyph="pencil" />  Review this Stadium
                                       </Button>
                              </a>
                         </div>
                    </div>
                </div>
                <div className="ibright">
                    <a href={"/venues/"+venue.id}>
                     <img src={venue["VImage"]} height="200" width="200" alt=""   />
                     </a>
                </div>
                    <div className="clear">&nbsp;</div>
                </div>
                    <br /><br />

                    {localData.length > 0 &&
                        <div style={{"max-height":"650px", "overflow": "auto"}}>
                          {localData.map((post, index) => {
                               return(<VenueDetailTable  key={post.id} post={post} venue={venue} amenities={amenities} pointOfInterests={pointOfInterests} users={users}/>
                                       );})}
                        </div>
                    }
                    {localData.length == 0 &&
                        <h3>No posts found</h3>}
          </div>
    );
  }
}

VenueDetailPage.propTypes = {
  venueDetail: PropTypes.object.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  params: PropTypes.object
};


function mapStateToProps(state, ownProps) {
  return {
            venueDetail: state.venueDetail
    };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueDetailPage);
