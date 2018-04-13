import React from 'react'
import Post from './Post';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

    render() {
        if (this.props.allPostsQuery.loading) {
            return (
                <div>
                    <div>
                        Loading...
                    </div>
                </div>
            )
        }
        return (
            this.props.allPostsQuery.allPosts && this.props.allPostsQuery.allPosts.map(el => {
                return (
                    <Post key={el.id} post={el} vote={this.vote}/>
                )
            })
        )
    }

    vote = async (value, total, id) => {
      total += value;
      console.log('totals is', total, id);
      await this.props.updatePostMutation({variables: {id,votes: total}});
      console.log('finished');
    }
}

const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
      votes
    }
  }
`;

const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: ID!, $votes: Int!) {
      updatePost(id: $id, votes: $votes) {
          id
          votes
      }
  }
`;

//const UpdatePostWithMutation = graphql(UPDATE_POST_MUTATION, {name: 'updatePostMutation'})(ListPage);

/*const ListPageWithQuery = graphql(ALL_POSTS_QUERY, {
    name: 'allPostsQuery',
    options: {
        fetchPolicy: 'network-only',
    },
})(ListPage);*/

const ListPageComponent = compose(
  graphql(UPDATE_POST_MUTATION, {name: 'updatePostMutation'}),
  graphql(ALL_POSTS_QUERY, {
    name: 'allPostsQuery',
    options: {
      fetchPolicy: 'network-only',
    },
  })
)(ListPage);

export default ListPageComponent;