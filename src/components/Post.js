import React from 'react'
import '../index.css';

class Post extends React.Component {

    render() {
      const { votes, id } = this.props.post;
      return(
          <div className="vt-post-container flex">
              <div className="vt-post-description">{this.props.post.description}</div>
              <div className="vt-post-votes">Votes: {this.props.post.votes}</div>
              <button className="vt-btn" type="btn" onClick={() => this.props.vote(1,votes, id)}>Up</button>
              <button className="vt-btn" type="btn" onClick={() => this.props.vote(-1, votes, id)}>Down</button>
          </div>

      )
  }
}

export default Post