import React from 'react'
import Post from './Post';
import { graphql } from 'react-apollo'
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
                    <Post key={el.id} post={el}/>
                )
            })
        )
    }
}

const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`;

const ListPageWithQuery = graphql(ALL_POSTS_QUERY, {
    name: 'allPostsQuery',
    options: {
        fetchPolicy: 'network-only',
    },
})(ListPage);

export default ListPageWithQuery;