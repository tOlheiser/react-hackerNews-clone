import React from 'react';
import Loading from './Loading';
import Item from './Item';
import { getUserPosts } from '../utils/api.js';
import { ThemeConsumer } from '../contexts/theme';

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
        const { posts } = this.state;

        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <React.Fragment>
                        <div className="container">
                            <div className="flex container-sm col">
                                <h2 className={`heading-${theme}`}>Posts</h2>
                                {posts == null 
                                    ?   <Loading loading="Fetching posts" />
                                    :   posts == false 
                                    ?   <p className={`content-${theme}`} style={{textAlign: 'center'}}>This user hasn't posted anything yet</p>
                                            
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
                )}
            </ThemeConsumer>
        )
    }
}