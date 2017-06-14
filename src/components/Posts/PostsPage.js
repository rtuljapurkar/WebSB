import React  from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import PostList from './PostList';
import * as actions from '../../actions/postActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import PostsTable from './PostsTable';
import { Table, Pagination } from 'react-bootstrap';
import {PropTypes} from 'prop-types';

class PostsPage extends React.Component {
      componentWillMount() {
          if (this.props.posts.data == [] || this.props.posts.data.length == 1) {
                this.props.actions.loadVenuePosts()
                .then()
                .catch( error => {
                        toastr.error(error);
                });
            }

            if (this.props.posts.venues == [] || this.props.posts.venues.length == 1) {
                this.props.actions.loadVenues()
                .then()
                .catch( error => {
                    toastr.error(error);
                });
            }

            if (this.props.posts.users == [] || this.props.posts.users.length == 1) {
                this.props.actions.loadUsers()
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
    const {filterString} = this.props.posts;
    const str = filterString.toLowerCase();
    return str !== ''
      ? localData.filter((r) => Object.values(r).some(this.doesMatch(str)))
      : localData;
  }

  sortData () {
    const data = [...this.props.posts.data] ;
    const {sortKey, sortDesc} = this.props.posts;
    const multiplier = sortDesc ? -1 : 1;
    data.sort((a, b) => {
      const aVal = a[sortKey] || 0;
      const bVal = b[sortKey] || 0;
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
    });
    return data;
  }

  render() {
      const posts = this.props.posts.data;
      const { filterString, sortKey, sortDesc } = this.props.posts;
      let localData = this.sortData();
      localData = this.filterData(localData);
      const postsFound = (posts.length > 1 || (posts.length == 1 && posts[0].id > 0));
      return (
                    <div style={{"align":"center"}} >
                        <h1>Posts</h1> {this.props.loading && <h4><b><LoadingDots interval={100} dots={20}/></b></h4>}

                         {!this.props.loading &&  postsFound &&
                         <div>
                          <input className="filter-input" value={filterString}
                            onChange={this.handleFilterStringChange()}
                            type="text" placeholder="Filter Rows"
                            autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                        </div>}
                         <br />
                          <div style={{"maxHeight":"700px", "overflow": "auto"}}>
                           {!this.props.loading &&  postsFound &&
                                   localData.map((post, index) => {
                                         return(
                                                 <PostsTable  key={post.id} post={post}
                                                     venues={this.props.posts.venues} users={this.props.posts.users} />
                                           );})

                          }
                          {!this.props.loading && !postsFound &&
                              <h3>No Posts found</h3>
                          }
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
    return {
        posts: state.posts,
        loading: state.loadingStatus.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
