// React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Styles
import './reset.css';
import './index.css';

// Components
import Nav from './components/Nav';
import Feed from './components/Feed';
import User from './components/User';
import Comment from './components/Comment';

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
            <Router>
                <div className="body" style={this.state.style === 'light' ? lightBody : darkBody}>
                    <Nav 
                        setFeed={this.setFeed}
                        toggleStyles={this.toggleStyles}
                        feed={this.state.feed}
                        style={this.state.style}
                    /> 
                    
                    <Route exact path='/' component={Feed} />
                    <Route path='/new' component={Feed} />
                    <Route path='/user' component={User} />
                    <Route path='/post' component={Comment}/>

                    {/*
                    <User 
                        username="danabramov"
                        style={this.state.style}
                    /> */}
                    
                    {/*
                    <Feed 
                        feed={this.state.feed}
                        style={this.state.style}
                    /> */}
                    {/*
                    <Comment 
                        postID="22022466"
                        style={this.state.style}
                    />*/}
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));