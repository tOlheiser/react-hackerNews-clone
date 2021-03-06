import React from 'react';
import Loading from './Loading';
import Comments from './Comments';
import { getItem, getItemDate } from '../utils/api.js';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';

export default class Post extends React.Component {
    state = {
        post: null,
    }

    componentDidMount() {
        const { search } = this.props.location;

        getItem(queryString.parse(search).id)
            .then(post => this.setState({
                post: post
            }))
    }

    render() {
        const { post } = this.state;

        return (
            <React.Fragment>
            {this.state.post == null 
                ? <Loading loading="Fetching post"/>
                
                : <React.Fragment>
                    <ThemeConsumer>
                        {({ theme }) => (
                            <div className="container">
                                <div className="container-sm col">
                                    <h1 className="heading">
                                        <a className={`headingLink title-${theme}`} href={post.url}>
                                            {post.title}
                                        </a>
                                    </h1>
                                    <p className="info">{`by `} 
                                        <Link className={`link-${theme}`} to={{
                                            pathname: '/user',
                                            search: `?id=${post.by}`
                                        }}>
                                            {post.by}
                                        </Link>

                                        {` on `}{getItemDate(post.time)}{` with `} 

                                        <Link className={`link-${theme}`} to={{
                                            pathname: '/post',
                                            search: `?id=${post.id}`
                                        }}>
                                            {post.descendants}
                                        </Link>
                                        
                                        {post.descendants !== 1 ? " comments" : " comment"}
                                    </p>  

                                    {post.text !== null &&
                                    <p dangerouslySetInnerHTML={{__html: post.text}}></p>}
                                </div>
                            </div>
                        )}
                    </ThemeConsumer>

                    { post.kids !== undefined && 
                    
                        <Comments 
                            commentIDs={post.kids}
                            numComments={post.descendants}
                        /> 
                    }
                    
                </React.Fragment>
            }
            </React.Fragment>
        )
    }
}