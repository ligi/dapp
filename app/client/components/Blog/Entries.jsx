import React, { Component } from 'react';
import ipfs from 'ipfs-js'
import Entry from './Entry'
import Spinner from './Spinner'

class Entries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      postsLoading: true,
      postsCount: -1
    }

    this.contract = this.props.contract;

    this.handlePostCount = this.handlePostCount.bind(this)
    this.handlePostLoad = this.handlePostLoad.bind(this)
  }

  componentDidMount() {
    this.contract.countPosts(this.handlePostCount)
    this.contract.loadPosts(this.handlePostLoad)
  }

  handlePostLoad(post) {
    const posts = this.state.posts
    posts.push(post);

    this.setState({ posts: posts }, this.checkIfAllPostsAreLoaded);
  }

  checkIfAllPostsAreLoaded() {
    if(this.state.posts.length == this.state.postsCount) {
      this.setState({
        postsLoading: false
      });
    }
  }

  handlePostCount(count) {
    this.setState({
      postsCount: count
    })
  }

  render() {
    if(this.state.postsLoading) {
      return <Spinner />;
    }

    const entries = this.state.posts.map(function(post) {
      return <Entry entry={post} key={`${post.identifier}${post.date}`} />
    }.bind(this));

    return (
      <ul>
        {entries}
      </ul>
    );
  }
}

export default Entries;