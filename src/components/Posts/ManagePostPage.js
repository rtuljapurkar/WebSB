import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import PostForm from './PostForm';
import toastr from 'toastr';


class ManagePostPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      post: Object.assign({}, props.post.data),
      errors: {},
      saving: false
    };

    this.updatePostState = this.updatePostState.bind(this);
    this.savePost = this.savePost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
    this.onStarRatingChange = this.onStarRatingChange.bind(this);
  }

  componentWillMount() {
    if (this.props.params.venueId && this.props.post.venue.id==0) {
        this.props.actions.addPostVenueLoad(this.props.params.venueId)
        .then()
        .catch( error => {
                    toastr.error(error);
        });
    }
    if (this.props.params.amenityId && this.props.post.amenity.id==0) {
        this.props.actions.addPostAmenityLoad(this.props.params.amenityId)
        .then()
        .catch( error => {
                    toastr.error(error);
        });
    }
    if (this.props.params.poiId && this.props.post.pointOfInterest.id==0) {
        this.props.actions.addPostPOILoad(this.props.params.poiId)
        .then()
        .catch( error => {
                    toastr.error(error);
        });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.post.VenueID != nextProps.post.VenueID) {
  //     this.setState({post: Object.assign({}, nextProps.post)});
  //   }
  // }

  updatePostState(event) {
    const field = event.target.name;
    let post = this.state.post;
    post[field] = event.target.value;
    return this.setState({post: post});
  }

  onStarRatingChange(newRating) {
    let post = this.state.post;
    post["Stars"] = newRating;
    return this.setState({post: post});
  }

  postFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.post.Text == "") {
      errors.Text = 'Post text must be filled';
      formIsValid = false;
    }
    if (this.state.post.Stars == "" || isNaN(this.state.post.Stars) ||
            (this.state.post.Stars > 5 || this.state.post.Stars < 1) ) {
      errors.Stars = 'Post Star must be a number between 1 and 5';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  savePost(event) {
    event.preventDefault();
    if (!this.postFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    let postToSubmit = this.state.post;
    postToSubmit.VenueID = this.props.post.venue.id;
    postToSubmit.AmenityID = this.props.post.amenity.id;
    postToSubmit.POIID = this.props.post.pointOfInterest.id;

    this.props.actions.savePost(postToSubmit)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }

cancelPost(event){
    event.preventDefault();
    this.context.router.push('/venues');
}
  redirect() {
    this.setState({saving: false});
    toastr.success('Post saved');
    this.context.router.push('/posts');
  }

  render() {
      console.log(this.props.post.amenity);
      console.log(this.props.post.pointOfInterest);
    return (
      <PostForm
        venue={this.props.post.venue}
        amenity={this.props.post.amenity}
        poi={this.props.post.pointOfInterest}
        onChange={this.updatePostState}
        onSave={this.savePost}
        post={this.state.post}
        errors={this.state.errors}
        saving={this.state.saving}
        onCancel={this.cancelPost}
        onStarRatingChange={this.onStarRatingChange}
      />
    );
  }
}

ManagePostPage.propTypes = {
  post: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  venue: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  amenity: PropTypes.object,
  poi: PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
ManagePostPage.contextTypes = {
  router: PropTypes.object
};

// function getPostById(posts, id) {
//   const post = posts.filter(post => post.data.id == id);
//   if (post) return post[0]; //since filter returns an array, have to grab the first.
//   return null;
// }


function mapStateToProps(state, ownProps) {
  return {
        post: state.newPost
    };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePostPage);
