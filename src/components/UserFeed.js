import React from 'react';
import Loading from './Loading';
import Item from './Item';
import { getUserPosts } from '../utils/api.js';

export default class UserFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: null
        };
    }

    componentDidMount() {
        getUserPosts(this.props.postIDs)
            .then(posts => this.setState({
                posts: posts
            }))
    }

    render() {
        const { username } = this.props;
        const { posts } = this.state;

        const lightHeading = {
            color: "#000",
        }

        const lightTitle = {
            color: '#BB2E1F',
        }

        const darkTitle = {
            color: '#CBCBCB',
        }

        const lightLink = {
            color: '#000',
        }

        const darkLink = {
            color: '#BEBEBE',
        }

        return (
            <React.Fragment>
                <div className="container">
                    <div className="flex container-sm col">
                        <h2 style={lightHeading}>Posts</h2>
                        {posts == null 
                            ?   <Loading loading="Fetching posts" />
                            :   posts == false 
                            ?   <p style={{textAlign: 'center'}}>This user hasn't posted anything yet</p>
                                    
                            :   <ul> {posts.map(post => {
                                    return (
                                        <Item 
                                            id={post.id} 
                                            url={post.url} 
                                            title={post.title} 
                                            author={post.by}
                                            time={post.time} 
                                            comments={post.descendants}
                                        />
                                    )})} 
                                </ul>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
