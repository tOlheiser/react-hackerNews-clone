import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import { getMainFeed, getUserProfile, getUserPosts, getItemDate, getPost, getComments } from './api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb as lightStyles } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as darkStyles } from '@fortawesome/free-regular-svg-icons';
import { cpus } from 'os';

class Nav extends React.Component {

    render() {
        const { feed, setFeed, toggleStyles, style } = this.props; 

        const lightNav = {
            color: '#000',
        }

        const darkNav = {
            color: '#CBCBCB',
        }

        const active = {
            color: '#BB2E1F'
        }

        // Determine the correct nav style, then fall back on it for the feed that isn't active.
        const navStyle = style === "light" ? lightNav : darkNav;

        return (
            <div className="container">
                <ul className="flex between row container-sm clear">
                    <div className="flex">
                        <li style={feed === 'top' ? active : navStyle} className="navLinks" onClick={() => setFeed('top')}>Top</li>
                        <li style={feed === 'new' ? active : navStyle} className="navLinks" onClick={() => setFeed('new')}>New</li>
                    </div>
                    <div className="flex">
                        <li className="navLinks" ><FontAwesomeIcon onClick={toggleStyles} className="lightbulb" icon={style === 'light' ? lightStyles : darkStyles} /></li>
                    </div>
                </ul><br></br>
            </div>
        );
    }
}

class Feed extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: null
        };
    }

    componentDidMount() {
        getMainFeed(this.props.feed)
        // returns the feed of items in JSON format.
            .then(items => this.setState({
                //grab the items and store them in the 'items' state.
                items: items
            }))
    }

    componentDidUpdate(prevProps) {
        // compare the current state of feed to the previous
        if (this.props.feed !== prevProps.feed) {
            getMainFeed(this.props.feed)
                .then(items => this.setState({
                    items: items
                }))
        }
    }

    render() {
        const { items } = this.state;
        const { style } = this.props;

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

        const titleStyle = style === 'light' ? lightTitle : darkTitle;
        const linkStyle = style === 'light' ? lightLink : darkLink;

        return (
            <div className="container">
                <div className="flex col container-sm">
                    <ul>
                        { items != null && items.map((item) => {
                            return (
                                <li className="item" key={item.id}> 
                                    <h2><a style={titleStyle} className="title" href={item.url}>{item.title}</a></h2>
                                    <p className="info">by <a className="infoLink" style={linkStyle} href="#">{item.by}</a> on {getItemDate(item.time)} with <a style={linkStyle} className="infoLink" href="#">{item.kids != null ? item.kids.length : '0'}</a> comments</p>
                                </li>)
                            })
                        }
                    </ul>
                    
                </div>
            </div>
        );
    }
}

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null
        };
    }

    componentDidMount() {
        getUserProfile(this.props.username)
            .then((profile) => this.setState({
                profile: profile,
            }));
    }

    render() {
        const { profile } = this.state;
        const { style, username } = this.props;

        const userHeadingLight = {
            color: "#000"
        }

        const userHeadingDark = {
            color: "#DADADA"
        }

        return (
            <React.Fragment>    
                {profile != null && 
                <React.Fragment>
                    <div className="container">
                        <div className="flex container-sm col">
                            <h1 className="userHeading" 
                                style={style === 'light' ? userHeadingLight : userHeadingDark}>
                                {profile.id}
                            </h1>
                            <p className="userInfo">joined 
                                <span className="userData"> {getItemDate(profile.created)} </span>
                                has <span className="userData">{profile.karma} </span>karma
                            </p>  
                        </div>
                    </div>

                    <React.Fragment>
                        <UserFeed 
                            username={username}
                            postIDs={profile.submitted}
                            style={style}
                        />
                    </React.Fragment>
                </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

class UserFeed extends React.Component {
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
        const { username, style } = this.props;
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
            <div className="container">
                <div className="flex container-sm col">
                    <h2 style={style === 'light' ? lightHeading : darkTitle}>Posts</h2>
                    <ul>
                    {posts != null && 
                        posts.map(post => {
                            return (
                                <React.Fragment>
                                    <li className="item" key={posts.id}>
                                        <h3 className="postTitle">
                                            <a href={post.url} className="title" style={style === 'light' ? lightTitle : darkTitle}>{post.title}</a>
                                        </h3>
                                        <p className="info">by <a className="infoLink" href="#" style={style === 'light' ? lightLink : darkLink}>{username}</a> on {getItemDate(post.time)}     with <a className="infoLink" href="#" style={style === 'light' ? lightLink : darkLink}>{post.descendants}</a> 
                                            {post.descendants !== 1 ? " comments" : " comment"}
                                        </p>
                                    </li>
                                </React.Fragment>
                            )
                        })
                    }
                    </ul>
                </div>
            </div>
        )
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
        }
    }

    componentDidMount() {
        getPost(this.props.postID)
            .then(post => this.setState({
                post: post
            }))
    }

    render() {
        const { post } = this.state;
        const { style } = this.props;

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
            {this.state.post != null &&
                <React.Fragment>
                    <React.Fragment>
                    <div className="container">
                        <div className="flex container-sm col">
                            <h1 className="postHeading">
                                <a className="headingLink" style={style === 'light' ? postHeadingLight : postHeadingDark} href={post.url}>
                                    {post.title}
                                </a>
                            </h1>
                            <p className="userInfo">by <a style={style === 'light' ? lightLink : darkLink} href="#">{post.by}</a> on {getItemDate(post.time)} with <span style={style === 'light' ? lightLink : darkLink}>{post.descendants}</span> {post.descendants !== 1 ? "comments" : "comment"}</p>  
                        </div>
                    </div>
                    </React.Fragment>

                    <React.Fragment>
                        <Comments commentIDs={post.kids}/>
                    </React.Fragment>
                </React.Fragment>
            }
            </React.Fragment>
        )
    }
}

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: null,
        }
    }

    componentDidMount() {
        getComments(this.props.commentIDs)
            .then(item => this.setState({
                comments: item
            }))
    }

    render() {
        const { comments } = this.state;

        return (
            <React.Fragment>
                {comments != null && comments.map(comment => 
                    <div className="commentContainer">
                        <div className="flex commentSmContainer col">
                            <p>by <a href="#">{comment.by}</a> on {getItemDate(comment.time)}</p>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                )
                }
            </React.Fragment>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            feed: 'top',
            style: 'light'
        };

        this.setFeed = this.setFeed.bind(this);
        this.toggleStyles = this.toggleStyles.bind(this);
    }

    setFeed(feed) {
        this.setState({
            feed: feed
        })
    }


    toggleStyles() {
        // Setting state based on previous state
        this.setState((state) => ({
            style: state.style === 'light' ? 'dark' : 'light'
        }));
    }

    render() {
        const darkBody = {
            backgroundColor: "#1C2022",
        }

        const lightBody = {
            backgroundColor: "white",
        }

        return (
            <div className="body" style={this.state.style === 'light' ? lightBody : darkBody}>
                <Nav 
                    setFeed={this.setFeed}
                    toggleStyles={this.toggleStyles}
                    feed={this.state.feed}
                    style={this.state.style}
                /> { /*
                <User 
                    username="danabramov"
                    style={this.state.style}
                />
                 <Feed 
                    feed={this.state.feed}
                    style={this.state.style}
                /> */ }
                 
                <Comment 
                    postID="22022466"
                    style={this.state.style}
                /> 
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));