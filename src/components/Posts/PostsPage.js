import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import PostList from './PostList';
import * as actions from '../../actions/postActions';
import LoadingDots from '../common/LoadingDots';
import toastr from 'toastr';
import PostsTable from './PostsTable';
import { Table, Pagination } from 'react-bootstrap';

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

      const { filterString, sortKey, sortDesc } = this.props.posts;
      let localData = this.sortData();
      localData = this.filterData(localData);
      return (
                    <div style={{"align":"center"}} >
                        <h1>Posts</h1> {this.props.loading && <h4><b><LoadingDots interval={100} dots={20}/></b></h4>}

                        {!this.props.loading && <div>
                          <input className="filter-input" value={filterString}
                            onChange={this.handleFilterStringChange()}
                            type="text" placeholder="Filter Rows"
                            autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                        </div>}
                         <br />
                        {/* <table className="table  table-striped table-bordered table-responsive table-hover mainScreen" >
                              <tbody>
                                  <tr>
                                      <th colSpan="2">Posts</th>
                                  </tr>
                                  {
                                          localData.map((post, index) => {
                                                return(
                                                        <PostsTable  key={post.id} post={post} venues={this.props.posts.venues} users={this.props.posts.users} props={this.props}/>
                                                  );})

                                  }
                              </tbody>
                       </table> */}
                          <div style={{"max-height":"700px", "overflow": "auto"}}>
                           {!this.props.loading &&
                                   localData.map((post, index) => {
                                         return(
                                                 <PostsTable  key={post.id} post={post}
                                                     venues={this.props.posts.venues} users={this.props.posts.users} />
                                           );})

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
