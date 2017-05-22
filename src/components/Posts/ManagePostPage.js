import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import PostForm from './PostForm';
import toastr from 'toastr';


export class ManagePostPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      post: Object.assign({}, props.post),
      errors: {},
      saving: false
    };

    this.updatePostState = this.updatePostState.bind(this);
    this.savePost = this.savePost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
    this.onStarRatingChange = this.onStarRatingChange.bind(this);
  }

  componentWillMount() {
    if (this.props.venue.id =="") {
        this.props.actions.addPostVenueLoad(this.props.params.venueId)
        .then()
        .catch( error => {
                    toastr.error(error);
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post.VenueID != nextProps.post.VenueID) {
      this.setState({post: Object.assign({}, nextProps.post)});
    }
  }

  updatePostState(event) {
    const field = event.target.name;
    let post = this.state.post;
    // console.log(event.target.value);
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
    this.props.actions.savePost(this.state.post)
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
    return (
      <PostForm
        venue={this.props.venue}
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
  params:  PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManagePostPage.contextTypes = {
  router: PropTypes.object
};

function getPostById(posts, id) {
  const post = posts.filter(post => post.id == id);
  if (post) return post[0]; //since filter returns an array, have to grab the first.
  return null;
}


function mapStateToProps(state, ownProps) {
  const venueId = ownProps.params.id; // from the path `/post/:id`
  let post = {Text: '', VenueID: '', UserName:'', Stars:0, UploadTime: '', Active: "1"};
  let venue = {id: '', VName: '', VDescription: '', VCity: '', VImage: '' };
  if(state.posts.venue == null || state.posts.venue.id =="")
  {
      return {
        venue: venue,
        post:post
      };
  }
  else
  {
        post.VenueID = state.posts.venue.id;
        post.UserName = localStorage.username;
        let currentDate = new Date();
        // post.UploadTime =  (currentDate.getMonth() + 1) + "/" + currentDate.getDate()
        //                     + "/" + currentDate.getFullYear() + " " +
        //                     currentDate.getHours() + ":" + currentDate.getMinutes();
        post.UploadTime = new Date();
        return {
        venue: state.posts.venue,
        post:post
        };
   }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePostPage);
