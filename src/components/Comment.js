import React from 'react';
import Loading from './Loading';
import Comments from './Comments';
import { getPost, getItemDate } from '../utils/api.js';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
        }
    }

    componentDidMount() {
        const { search } = this.props.location;

        getPost(queryString.parse(search).id)
            .then(post => this.setState({
                post: post
            }))
    }

    render() {
        const { post } = this.state;

        const postHeadingLight = {
            color: '#BB2E1F',
        }

        const postHeadingDark = {
            color: '#CBCBCB',
        }

        const lightLink = {
            color: '#000',
            textDecoration: "underline",
        }

        const darkLink = {
            color: '#BEBEBE',
            textDecoration: "underline",
        }

        return (
            <React.Fragment>
            {this.state.post == null 
                ? <Loading loading="Fetching post"/>
                
                : <React.Fragment>
                    <div className="container">
                        <div className="flex container-sm col">
                            <h1 className="postHeading">
                                <a className="headingLink" style={postHeadingLight} href={post.url}>
                                    {post.title}
                                </a>
                            </h1>
                            <p className="userInfo">{`by `} 
                                <Link to={{
                                    pathname: '/user',
                                    search: `?id=${post.by}`
                                }}>
                                    {post.by}
                                </Link>

                                {` on `}{getItemDate(post.time)}{` with `} 

                                <Link className="" to={{
                                    pathname: '/post',
                                    search: `?id=${post.id}`
                                }}>
                                    {post.descendants}
                                </Link>
                                
                                {post.descendants !== 1 ? " comments" : " comment"}
                            </p>  
                        </div>
                    </div>

                    <Comments 
                        commentIDs={post.kids}
                    />
                </React.Fragment>
            }
            </React.Fragment>
        )
    }
}