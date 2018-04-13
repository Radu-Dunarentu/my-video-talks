import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql} from 'react-apollo'
import Modal from 'react-modal'
import gql from 'graphql-tag'

const modalStyle = {
    overlay: {
        zIndex: 20,
        backgroundColor: 'rgba(255,255,255,.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        position: 'relative',
        width: 600,
        height: 'auto',
        top: 'initial',
        left: 'initial',
        right: 'initial',
        bottom: 'initial',
        borderRadius: 2,
        padding: 0,
        border: 'none',
        background: 'none',
        boxShadow: '0 1px 7px rgba(0,0,0,.2)',
    },
};

class CreatePage extends React.Component {

    state = {
        description: '',
        imageUrl: '',
    };

    render() {

        return(
            <Modal
                isOpen
                contentLabel='Create Post'
                ariaHideApp={false}
                style={modalStyle}
                onRequestClose={this.props.history.goBack}
            >
                <div className='pa4 flex justify-center bg-white'>
                    <div style={{maxWidth: 400}} className=''>
                        {this.state.imageUrl &&
                        <img
                            src={this.state.imageUrl}
                            alt=''
                            className='w-100 mv3'
                        />}
                        <input
                            className='w-100 pa3 mv2'
                            value={this.state.imageUrl}
                            placeholder='Image Url'
                            onChange={e => this.setState({imageUrl: e.target.value})}
                            autoFocus
                        />
                        <input
                            className='w-100 pa3 mv2'
                            value={this.state.description}
                            placeholder='Description'
                            onChange={e => this.setState({description: e.target.value})}
                        />
                        {this.state.description &&
                        this.state.imageUrl &&
                        <button
                            className='pa3 bg-black-10 bn dim ttu pointer'
                            onClick={this.handlePost}
                        >
                            Post
                        </button>}
                    </div>
                </div>
            </Modal>
        )
    }

    handlePost = async () => {
        const {description, imageUrl} = this.state;
        await this.props.createPostMutation({variables: {description, imageUrl}});
        this.props.history.replace('/')
    }

}

const CREATE_POST_MUTATION = gql`
    mutation CreatePostMutation($description: String!, $imageUrl: String!) {
        createPost(description: $description, imageUrl: $imageUrl, votes: 0) {
            id
            description
            imageUrl
        }
    }
`;

const CreatePageWithMutation = graphql(CREATE_POST_MUTATION, {name: 'createPostMutation'})(CreatePage);

export default withRouter(CreatePageWithMutation)