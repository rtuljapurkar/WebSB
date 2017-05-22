import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import PostList from './PostList';
import * as actions from '../../actions/postActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import PostsTable from './PostsTable';

class PostsPage extends React.Component {


  componentWillMount() {
  if (this.props.posts.data == [] || this.props.posts.data.length == 1) {
        this.props.actions.loadPosts()
        .then()
        .catch( error => {
                toastr.error(error);
        });
    }

    if (this.props.venues.data == [] || this.props.venues.data.length == 1) {
        this.props.actions.loadVenues()
        .then()
        .catch( error => {
            toastr.error(error);
        });
    }
  }


  render() {
    const posts = this.props.posts;
    const venues = this.props.venues;
    return (
      <div className="col-md-12">
        <h1>Posts {this.props.loading && <LoadingDots interval={100} dots={20}/>}
        </h1>
        <div className="col-md-12">
          <PostsTable {...this.props} />
        </div>
      </div>
    );
  }
}

PostsPage.propTypes = {
  posts: PropTypes.object.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  venues: PropTypes.object.isRequired

};


function mapStateToProps(state, ownProps) {

  if (state.posts.data && state.posts.data.length > 0) {
    return {

            posts: state.posts,
            loading: state.ajaxCallsInProgress > 0,
            venues: state.venues
    };
  }
  else  {

    return {
                posts: {
                  data: [{id: 0, VName: '', VAddress: '', Stars:"0", VCity: '', VImage: '', VenueID:0 }],
                  sortDesc: false,
                  sortKey: 'VName',
                  filterString: ''
              },
                loading: state.ajaxCallsInProgress > 0,
                venues: {
                  data: [{id: 0, VName: '', VAddress: '', VCity: '', VImage: '' }],
                  sortDesc: false,
                  sortKey: 'VName',
                  filterString: ''
              }
            };
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
