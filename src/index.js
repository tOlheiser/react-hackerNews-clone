import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import { getMainFeed, getUserProfile, getItemDate } from './api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb as lightStyles } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as darkStyles } from '@fortawesome/free-regular-svg-icons';

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
                                    <p><a style={titleStyle} className="title" href={item.url}>{item.title}</a></p>
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

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null
        };
    }

    componentDidMount() {
        getUserProfile(this.props.username)
            .then((profile) => this.setState({
                profile: profile
            }))
    }

    render() {
        const { profile } = this.state;
        const { style } = this.props;

        const userHeadingLight = {
            color: "#000"
        }

        const userHeadingDark = {
            color: "#DADADA"
        }

        return (
            <div className="container">
                <div className="flex container-sm col">
                    <h1 className="userHeading" style={style === 'light' ? userHeadingLight : userHeadingDark}>
                        {profile != null && profile.id}
                    </h1>
                    <p className="userInfo">joined 
                        <span className="userData"> {profile != null && getItemDate(profile.created)} </span>
                        has <span className="userData">{profile != null && profile.karma} </span>karma
                    </p>
                </div>
            </div>
        )
    }
}

class UserFeed extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="flex container-sm col">
                    <h2>Posts</h2>
                </div>
            </div>
        )
    }
}

class User extends React.Component {


    render() {
        const { username, style } = this.props;

        return (
            <div>
                <UserProfile username={username} style={style} />
                <UserFeed username={username} style={style} />           
            </div>
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
            style: state.style == 'light' ? 'dark' : 'light'
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
            <body style={this.state.style == 'light' ? lightBody : darkBody}>
                <Nav 
                    setFeed={this.setFeed}
                    toggleStyles={this.toggleStyles}
                    feed={this.state.feed}
                    style={this.state.style}
                />
                { /* <Feed 
                    feed={this.state.feed}
                    style={this.state.style}
                /> */ }
                <User 
                    username="danabramov"
                    style={this.state.style}
                />

            </body>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));