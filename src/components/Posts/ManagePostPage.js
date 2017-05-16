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
  }

  componentWillMount() {
      console.log("ManagePostPage componentWillMount" );
      console.log(this.props.venue);
      //debugger;
    if (this.props.venue.id =="") {
        console.log("ManagePostPage calling getVenuebyId");
        this.props.actions.addPostVenueLoad(this.props.params.venueId)
        .then()
        .catch( error => {
          console.log("in error");
                    toastr.error(error);
        });
        //console.log(this.props);

    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post.VenueID != nextProps.post.VenueID) {
      // Necessary to populate form when existing post is loaded directly.
      this.setState({post: Object.assign({}, nextProps.post)});
    }
  }

  updatePostState(event) {
    const field = event.target.name;
    let post = this.state.post;
    post[field] = event.target.value;
    return this.setState({post: post});
  }

  postFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.post.Text == "") {
      errors.title = 'Post text must be filled';
      formIsValid = false;
    }
    if (this.state.post.Stars == "") {
      errors.title = 'Post Star must be a number';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  savePost(event) {
    event.preventDefault();
    //debugger;
    if (!this.postFormIsValid()) {
      return;
    }
      //debugger;
    this.setState({saving: true});
    this.props.actions.savePost(this.state.post)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Post saved');
    this.context.router.push('/posts');
  }

  render() {
      //const posts = this.props.posts;
      console.log("render: ");
      console.log(this.state.post);
    return (
      <PostForm
        venue={this.props.venue}
        onChange={this.updatePostState}
        onSave={this.savePost}
        post={this.state.post}
        errors={this.state.errors}
        saving={this.state.saving}
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
  let post = {Text: '', VenueID: '', UserName:'', Stars:'', UploadTime: ''};
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
        post.UserName = sessionStorage.username;
        let currentDate = new Date();
        post.UploadTime =  (currentDate.getMonth() + 1) + "/" + currentDate.getDate()
                            + "/" + currentDate.getFullYear() + " " +
                            currentDate.getHours() + ":" + currentDate.getMinutes();
        console.log(" mapStateToProps "    );
        console.log(post  );
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
